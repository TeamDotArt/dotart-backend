import { FastifyRequest } from 'fastify';
import { FindAllUserPalletResponse } from '../dto/findAll-user-pallet.dto';
import { FindUserPalletResponse } from '../dto/find-user-pallet.dto';
import { RemoveUserPalletResponse } from '../dto/delete-user-pallet.dto';
import {
  CreateUserPalletRequest,
  CreateUserPalletResponse,
} from '../dto/create-user-pallet.dto';
import {
  UpdateUserPalletRequest,
  UpdateUserPalletResponse,
} from '../dto/update-user-pallet.dto';

export interface UserPalletControllerInterface {
  // ユーザパレットの検索処理
  getUserPallet(palletId: string): Promise<FindUserPalletResponse>;
  // 名前からユーザパレットの検索をする処理
  getUserPalletByName(name: string): Promise<FindUserPalletResponse>;
  // すべてのユーザパレットを検索する処理
  getUserPallets(): Promise<FindAllUserPalletResponse[]>;

  // ユーザパレットの作成処理
  createUserPallet(
    authorization: FastifyRequest,
    userPallet: CreateUserPalletRequest,
  ): Promise<CreateUserPalletResponse>;

  // ユーザパレットの更新処理
  updateUserPallet(
    authorization: FastifyRequest,
    userPallet: UpdateUserPalletRequest,
  ): Promise<UpdateUserPalletResponse>;

  // ユーザパレットの削除処理
  deleteUserPallet(
    authorization: FastifyRequest,
  ): Promise<RemoveUserPalletResponse>;
}
