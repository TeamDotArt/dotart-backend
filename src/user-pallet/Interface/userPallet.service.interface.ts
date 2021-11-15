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

export interface UserPalletServiceInterface {
  // get pasic pallet
  findUserPalletId(userPalletId: string): Promise<FindUserPalletResponse>;
  findUserPalletByName(name: string): Promise<FindUserPalletResponse>;

  // get all basic pallet
  findAll(): Promise<FindAllUserPalletResponse[]>;

  // create basic pallet
  create(
    authorization: FastifyRequest,
    userPallet: CreateUserPalletRequest,
  ): Promise<CreateUserPalletResponse>;

  // update basic pallet
  update(
    authorization: FastifyRequest,
    userPallet: UpdateUserPalletRequest,
  ): Promise<UpdateUserPalletResponse>;

  // delete basic pallet
  remove(authorization: FastifyRequest): Promise<RemoveUserPalletResponse>;
}
