import { UploadedFile } from "express-fileupload";

import { EFileType } from "../enums/file-type";
import { ApiError } from "../errors/api.error";
import { IQuery } from "../interface/pagitation.interface";
import { ITokenPayload } from "../interface/token.interface";
import { IUser } from "../interface/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

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
    await Promise.all([userRepository.deleteMe(jwtPayload.userId), tokenRepository.deleteManyBy(jwtPayload.userId)]);
  }

  public async getMany(query: IQuery) {
    const queryString = JSON.stringify(query);
    const queryObject = JSON.parse(queryString.replace(/\b(gte|lte|gt|lt)\b/, (match) => `$${match}`));
    return await userRepository.getMany(queryObject);
  }

  public async uploadAvatar(userId: string, avatar: UploadedFile) {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("user not found", 403);
    }
    const filePath = await s3Service.uploadFile(avatar, EFileType.Users, userId);

    await userRepository.updateMe(userId, { avatar: filePath });
  }
}
export const userService = new UserService();
