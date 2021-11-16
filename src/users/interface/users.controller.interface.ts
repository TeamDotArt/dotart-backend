import { FastifyRequest } from 'fastify';
import { FindUserParam, FindUserResponse } from '../dto/find-user.dto';
import { FindAllUserResponse } from '../dto/findAll-user.dto';
import { RemoveUserResponse } from '../dto/remove-user.dto';
import { UpdateUserRequest, UpdateUserResponse } from '../dto/update-user.dto';

export interface UsersControllerInterface {
  // get user pallet
  getUser(userParam: FindUserParam): Promise<FindUserResponse>;

  // get all user pallet
  getUsers(): Promise<FindAllUserResponse[]>;

  // update user pallet
  updateProfile(
    authorization: FastifyRequest,
    user: UpdateUserRequest,
  ): Promise<UpdateUserResponse>;

  // delete user pallet
  deleteUser(authorization: FastifyRequest): Promise<RemoveUserResponse>;
}
