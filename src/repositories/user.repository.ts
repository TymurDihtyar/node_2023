import { IUser } from "../interface/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getAll(): Promise<IUser[]> {
    return await User.find({});
  }

  public async getById(id: string): Promise<IUser> {
    return await User.findOne({ _id: id });
  }

  public async singUp(body: Partial<IUser>): Promise<IUser> {
    return await User.create(body);
  }
}

export const userRepository = new UserRepository();
