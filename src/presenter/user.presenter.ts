import { configs } from "../configs/config";
import { IUser } from "../interface/user.interface";

export class UserPresenter {
  public static userToResponse(user: IUser) {
    return {
      name: user.name,
      email: user.email,
      age: user.age,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      avatar: user?.avatar ? `${configs.AWS_S3_URL}${user?.avatar}` : null,
    };
  }
}
