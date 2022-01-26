import { FastifyRequest } from 'fastify';
import { FindAllUserPalletResponse } from '../dto/findAll-user-pallet.dto';
import { FindUserPalletResponse } from '../dto/find-user-pallet.dto';
import {
  RemoveUserPalletRequest,
  RemoveUserPalletResponse,
} from '../dto/delete-user-pallet.dto';
import {
  CreateUserPalletRequest,
  CreateUserPalletResponse,
} from '../dto/create-user-pallet.dto';
import {
  UpdateUserPalletRequest,
  UpdateUserPalletResponse,
} from '../dto/update-user-pallet.dto';

export interface UserPalletServiceInterface {
  // 固有IDを指定してユーザーパレットを取得
  findUserPalletId(userPalletId: string): Promise<FindUserPalletResponse>;
  // 名前からユーザーパレットを取得する処理
  findUserPalletByName(name: string): Promise<FindUserPalletResponse>;

  // すべてのユーザーパレットを取得する処理
  findAll(): Promise<FindAllUserPalletResponse[]>;

  // ユーザパレットの作成処理
  create(
    authorization: FastifyRequest,
    userPallet: CreateUserPalletRequest,
  ): Promise<CreateUserPalletResponse>;

  // ユーザパレットの更新処理
  update(
    authorization: FastifyRequest,
    userPallet: UpdateUserPalletRequest,
  ): Promise<UpdateUserPalletResponse>;

  // ユーザパレットの削除処理
  remove(
    authorization: FastifyRequest,
    userPallet: RemoveUserPalletRequest,
  ): Promise<RemoveUserPalletResponse>;
}
