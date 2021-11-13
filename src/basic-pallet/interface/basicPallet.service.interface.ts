import { RemoveBasicPalletResponse } from '../dto/delete-basic-pallet.dto';
import { FindBasicPalletResponse } from '../dto/find-basic-pallet.dto';
import { FindAllBasicPalletResponse } from '../dto/findAll-basic-pallet.dto';
import {
  CreateBasicPalletRequest,
  CreateBasicPalletResponse,
} from '../dto/create-basic-pallet.dto';
import {
  UpdateBasicPalletRequest,
  UpdateBasicPalletResponse,
} from '../dto/update-basic-pallet.dto';

export interface BasicPalletServiceInterface {
  // get pasic pallet
  findBasicPalletId(basicPalletId: string): Promise<FindBasicPalletResponse>;
  findBasicPalletByName(
    basicPalletName: string,
  ): Promise<FindBasicPalletResponse>;
  // get all basic pallet
  findAll(): Promise<FindAllBasicPalletResponse[]>;

  // create basic pallet
  create(
    basicPallet: CreateBasicPalletRequest,
  ): Promise<CreateBasicPalletResponse>;

  // update basic pallet
  update(
    basicPalletId: string,
    basicPallet: UpdateBasicPalletRequest,
  ): Promise<UpdateBasicPalletResponse>;

  // delete basic pallet
  remove(basicPalletId: string): Promise<RemoveBasicPalletResponse>;
}
