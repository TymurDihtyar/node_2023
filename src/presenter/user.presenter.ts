import { IUser } from "../interface/user.interface";

export class UserPresenter {
  public static userToResponse(user: IUser) {
    return {
      name: user.name,
      email: user.email,
      age: user.age,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
    };
  }
}
