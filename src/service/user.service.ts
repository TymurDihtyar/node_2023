import { ApiError } from "../errors/api.error";
import { IUser } from "../interface/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAll(): Promise<IUser[]> {
    return await userRepository.getAll();
  }

  public async getById(id: string): Promise<IUser> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return user;
  }

  public async singUp(body: Partial<IUser>): Promise<IUser> {
    return await userRepository.singUp(body);
  }

  public async deleteById(id: string): Promise<void> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    await userRepository.deleteById(id);
  }

  public async updateById(id: string, body: Partial<IUser>): Promise<IUser> {
    const user = await userRepository.getById(id);
    if (!user) {
      throw new ApiError("user not found", 422);
    }
    return await userRepository.updateById(id, body);
  }
}
export const userService = new UserService();
