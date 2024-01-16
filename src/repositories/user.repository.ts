import {read, write} from "../fs.service";
import { IUser } from "../interface/user.interface";

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
