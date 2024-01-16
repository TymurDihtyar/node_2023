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

  public async delete(id): Promise<IUser> {
    const users = await userRepository.getAll();
    const index = users.findIndex((user) => user.id === id);
    if (index === -1) {
      throw new Error("user not found");
    }
    const delUser = users.splice(index, 1);
    await userRepository.write(users);
    return delUser[0];
  }

  public async put(id, name, age, email): Promise<IUser[]> {
    const users = await userRepository.getAll();

    const user = users.find((user) => user.id === id);
    if (!user) {
      throw new Error("user not found");
    }
    user.name = name;
    user.age = age;
    user.email = email;

    await userRepository.write(users);
    return users;
  }
}
export const userService = new UserService();
