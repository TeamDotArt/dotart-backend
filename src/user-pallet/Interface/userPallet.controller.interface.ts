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
  // get user pallet
  getUserPallet(palletId: string): Promise<FindUserPalletResponse>;

  getUserPalletByName(name: string): Promise<FindUserPalletResponse>;
  // get all user pallet
  getUserPallets(): Promise<FindAllUserPalletResponse[]>;

  // create user pallet
  createUserPallet(
    authorization: FastifyRequest,
    userPallet: CreateUserPalletRequest,
  ): Promise<CreateUserPalletResponse>;

  // update user pallet
  updateUserPallet(
    authorization: FastifyRequest,
    userPallet: UpdateUserPalletRequest,
  ): Promise<UpdateUserPalletResponse>;

  // delete user pallet
  deleteUserPallet(
    authorization: FastifyRequest,
  ): Promise<RemoveUserPalletResponse>;
}
