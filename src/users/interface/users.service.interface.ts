import { FastifyRequest } from 'fastify';
import { FindAllUserResponse } from '../dto/findAll-user.dto';
import { GetUserProfileResponse } from '../dto/get-user.dto';
import { RemoveUserResponse } from '../dto/remove-user.dto';
import { UpdateUserRequest, UpdateUserResponse } from '../dto/update-user.dto';
import { User } from '../entities/user.entity';

export interface UsersServiceInterface {
  // 固有IDでユーザーを取得
  findUserById(id: number): Promise<User>;
  // Emailトークンでユーザーを取得
  findUserByEmailToken(emailToken: string): Promise<User>;
  // パスワードトークンでユーザーを取得
  findUserByPasswordToken(passwordToken: string): Promise<User>;

  // 固有IDでユーザーIDを取得
  getUserIdById(id: number): Promise<string>;
  // 名前でユーザーIDを取得
  getUserIdByName(name: string): Promise<string>;

  // ユーザプロフィールを取得
  getUserProfile(userId: string): Promise<GetUserProfileResponse>;
  // 固有IDでユーザプロフィールを取得
  getUserProfileById(id: number): Promise<GetUserProfileResponse>;

  // すべてのユーザーの取得処理
  findAll(): Promise<FindAllUserResponse[]>;

  // 認証用検索処理
  validateFindByUserId(userId: string): Promise<User>;

  // ユーザプロフィールの更新処理
  updateProfile(
    authorization: FastifyRequest,
    user: UpdateUserRequest,
  ): Promise<UpdateUserResponse>;

  // ユーザの削除処理
  remove(authorization: FastifyRequest): Promise<RemoveUserResponse>;
}
