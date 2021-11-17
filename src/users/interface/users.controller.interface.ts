import { FastifyRequest } from 'fastify';
import { FindUserParam, FindUserResponse } from '../dto/find-user.dto';
import { FindAllUserResponse } from '../dto/findAll-user.dto';
import { RemoveUserResponse } from '../dto/remove-user.dto';
import { UpdateUserRequest, UpdateUserResponse } from '../dto/update-user.dto';

export interface UsersControllerInterface {
  // ユーザの取得処理
  getUser(userParam: FindUserParam): Promise<FindUserResponse>;

  // すべてのユーザの取得処理
  getUsers(): Promise<FindAllUserResponse[]>;

  // ユーザプロフィールの更新処理
  updateProfile(
    authorization: FastifyRequest,
    user: UpdateUserRequest,
  ): Promise<UpdateUserResponse>;

  // ユーザの削除処理
  deleteUser(authorization: FastifyRequest): Promise<RemoveUserResponse>;
}
