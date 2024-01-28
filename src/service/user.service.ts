import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interface/token.interface";
import { IUser } from "../interface/user.interface";
import { userRepository } from "../repositories/user.repository";
import {tokenRepository} from "../repositories/token.repository";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async getById(id: string): Promise<IUser> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("user not found", 422);
    }
    return user;
  }

  public async getMe(jwtPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload.userId);
    if (!user) {
      throw new ApiError("You cant get user", 403);
    }
    return user;
  }

  public async updateMe(jwtPayload: ITokenPayload, body: Partial<IUser>): Promise<IUser> {
    const user = await userRepository.getById(jwtPayload.userId);
    if (!user) {
      throw new ApiError("user not found", 403);
    }
    return await userRepository.updateMe(jwtPayload.userId, body);
  }

  public async deleteMe(jwtPayload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(jwtPayload.userId);
    if (!user) {
      throw new ApiError("user not found", 403);
    }
    await Promise.all([
      userRepository.deleteMe(jwtPayload.userId),
      tokenRepository.deleteManyBy(jwtPayload.userId)
    ]);
  }
}
export const userService = new UserService();
