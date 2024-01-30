import { Types } from "mongoose";

import { EEmailAction } from "../enums/email-action.enum";
import { EActionTockenType } from "../enums/token-type.enum";
import { ApiError } from "../errors/api.error";
import { ILogin } from "../interface/auth.interface";
import { ITokenPair, ITokenPayload } from "../interface/token.interface";
import { IChangePassword, IUser } from "../interface/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async singUp(dto: Partial<IUser>): Promise<IUser> {
    const userFromDb = await userRepository.getOneByParams({ email: dto.email });
    if (userFromDb) {
      throw new ApiError("User with provided email already exist", 400);
    }
    const hashedPassword = await passwordService.hash(dto.password);

    const user = await userRepository.create({ ...dto, password: hashedPassword });

    const actionToken = tokenService.createActionToken({ userId: user._id }, EActionTockenType.ACTIVATE);

    await Promise.all([
      tokenRepository.createActionToken({ actionToken, _userId: user._id, tokenType: EActionTockenType.ACTIVATE }),
      emailService.sendMail(dto.email, EEmailAction.WELCOME, { actionToken, name: dto.name }),
    ]);

    return user;
  }

  public async singIn(dto: ILogin): Promise<ITokenPair> {
    const user = await userRepository.getOneByParams({ email: dto.email });
    if (!user) throw new ApiError("Not valid email of password", 401);

    const isMatch = await passwordService.compare(dto.password, user.password);
    if (!isMatch) throw new ApiError("Not valid email of password", 401);

    if (!user.isVerified) throw new ApiError("Verify your account", 403);

    const jwtTokens = tokenService.generateTokenPair({ userId: user._id });
    await tokenRepository.create({ ...jwtTokens, _userId: user._id });

    return jwtTokens;
  }

  public async refresh(jwtPayload: ITokenPayload, refreshToken: string): Promise<ITokenPair> {
    await tokenRepository.deleteTokenByParams({ refreshToken });

    const jwtTokens = tokenService.generateTokenPair({
      userId: jwtPayload.userId,
    });

    await tokenRepository.create({
      ...jwtTokens,
      _userId: new Types.ObjectId(jwtPayload.userId),
    });
    return jwtTokens;
  }

  public async forgotPassword(user: IUser) {
    const actionToken = tokenService.createActionToken({ userId: user._id }, EActionTockenType.FORGOT);

    await Promise.all([
      tokenRepository.createActionToken({ actionToken, _userId: user._id, tokenType: EActionTockenType.FORGOT }),
      emailService.sendMail(user.email, EEmailAction.FORGOT_PASSWORD, { actionToken }),
    ]);
  }

  public async setForgotPassword(password: string, actionToken: string) {
    const payload = tokenService.checkActionToken(actionToken, EActionTockenType.FORGOT);

    const entity = await tokenRepository.getActionTokenByParams({ actionToken });
    if (!entity) {
      throw new ApiError("Not valid token", 400);
    }

    const newHashedPassword = await passwordService.hash(password);

    await Promise.all([
      userRepository.updateMe(payload.userId, { password: newHashedPassword }),
      tokenRepository.deleteActionTokenByParams({ actionToken })
    ]);
  }

  public async verify(actionToken: string) {
    const payload = tokenService.checkActionToken(actionToken, EActionTockenType.ACTIVATE);

    const entity = await tokenRepository.getActionTokenByParams({ actionToken });
    if (!entity) {
      throw new ApiError("Not valid token", 400);
    }

    await Promise.all([
      userRepository.updateMe(payload.userId, { isVerified: true }),
      tokenRepository.deleteActionTokenByParams({ actionToken })
    ]);
  }

  public changePassword = async (dto: IChangePassword, jwtPayload: ITokenPayload) => {
    const user = await userRepository.getById(jwtPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }

    const isMatch = await passwordService.compare(dto.oldPassword, user.password);
    if (!isMatch) {
      throw new ApiError("Old password is invalid", 400);
    }

    const hashedNewPassword = await passwordService.hash(dto.newPassword);
    await userRepository.updateMe(user._id, { password: hashedNewPassword });
  };
}
export const authService = new AuthService();

// const users = await userRepository.getAll();
// await Promise.all(
//   users.map(async (user) => {
//     await emailService.sendMail(user.email, EEmailAction.WELCOME, {
//       name: user.name,
//     });
//   }),
// );
