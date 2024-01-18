import { ApiError } from "../errors/api.error";
import { ILogin } from "../interface/auth.interface";
import { ITokenPair } from "../interface/token.interface";
import { IUser } from "../interface/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async singUp(dto: Partial<IUser>): Promise<IUser> {
    const hashedPassword = await passwordService.hash(dto.password);
    return await userRepository.create({ ...dto, password: hashedPassword });
  }

  public async singIn(dto: ILogin): Promise<ITokenPair> {
    const user = await userRepository.getOneByParams({ email: dto.email });
    if (!user) throw new ApiError("Not valid email of password", 401);

    const isMatch = await passwordService.compare(dto.password, user.password);
    if (!isMatch) throw new ApiError("Not valid email of password", 401);

    const jwtTokens = tokenService.generateTokenPair({ userId: user._id });
    await tokenRepository.create({ ...jwtTokens, _userId: user._id });

    return jwtTokens;
  }

  public async refresh(dto: Partial<ITokenPair>): Promise<ITokenPair> {
    const tokens = await tokenRepository.getTokenByParams({
      refreshToken: dto.refreshToken,
    });

    if (!tokens) throw new ApiError("Not tokens found", 401);

    const jwtTokens = tokenService.generateTokenPair({
      userId: tokens._userId,
    });

    const result = await tokenRepository.update(
      { ...jwtTokens, _userId: tokens._userId },
      tokens._id,
    );
    console.log(result);

    return result;
  }
}
export const authService = new AuthService();
