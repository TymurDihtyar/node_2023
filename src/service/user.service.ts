import { IUser } from "../interface/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getAll(): Promise<IUser[]> {
    const users = await userRepository.getAll();
    return users;
  }

  public async getById(id): Promise<IUser> {
    const users = await userRepository.getAll();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("user not found");
    }
    return users[index];
  }

  public async create(name, age, email): Promise<IUser> {
    const users = await userRepository.getAll();
    const newUser = { id: users[users.length - 1].id + 1, name, age, email };
    users.push(newUser);
    await userRepository.write(users);
    return newUser;
  }
}
export const userService = new UserService();
