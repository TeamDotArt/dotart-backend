import { FastifyRequest } from 'fastify';
import { FindAllUserResponse } from '../dto/findAll-user.dto';
import { GetUserProfileResponse } from '../dto/get-user.dto';
import { RemoveUserResponse } from '../dto/remove-user.dto';
import { UpdateUserRequest, UpdateUserResponse } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface UsersServiceInterface {
  // get pasic pallet
  findUserById(id: number): Promise<User>;
  findUserByEmailToken(emailToken: string): Promise<User>;
  findUserByPasswordToken(passwordToken: string): Promise<User>;

  // userData
  getUserIdById(id: number): Promise<string>;
  getUserIdByName(name: string): Promise<string>;

  // profile
  getUserProfile(userId: string): Promise<GetUserProfileResponse>;
  getUserProfileById(id: number): Promise<GetUserProfileResponse>;

  // get all basic pallet
  findAll(): Promise<FindAllUserResponse[]>;

  // 認証用
  validateFindByUserId(userId: string): Promise<User>;

  // update basic pallet
  updateProfile(
    authorization: FastifyRequest,
    user: UpdateUserRequest,
  ): Promise<UpdateUserResponse>;

  // delete basic pallet
  remove(authorization: FastifyRequest): Promise<RemoveUserResponse>;
}
