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
      throw new ApiError("user not found", 422);
    }
    return user;
  }

  public async singUp(body: Partial<IUser>): Promise<IUser> {
    return await userRepository.singUp(body);
  }

  // public async delete(id): Promise<IUser> {
  //   const users = await userRepository.getAll();
  //   const index = users.findIndex((user) => user.id === id);
  //   if (index === -1) {
  //     throw new ApiError("user not found", 422);
  //   }
  //   const delUser = users.splice(index, 1);
  //   await userRepository.write(users);
  //   return delUser[0];
  // }
  //
  // public async put(id, name, age, email): Promise<IUser[]> {
  //   const users = await userRepository.getAll();
  //
  //   const user = users.find((user) => user.id === id);
  //   if (!user) {
  //     throw new ApiError("user not found", 422);
  //   }
  //   user.name = name;
  //   user.age = age;
  //   user.email = email;
  //
  //   await userRepository.write(users);
  //   return users;
  // }
}
export const userService = new UserService();
