import { IUser } from "../interface/user.interface";
import { read, write } from "../service/fs.service";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    const users = await read();
    return users;
  }

  public async write(users): Promise<void> {
    await write(users);
  }
}

export const userRepository = new UserRepository();
