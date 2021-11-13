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

export interface BasicPalletControllerInterface {
  // get pasic pallet
  getBasicPallet(basicPalletId: string): Promise<FindBasicPalletResponse>;
  getBasicPalletByName(
    basicPalletName: string,
  ): Promise<FindBasicPalletResponse>;
  // get all basic pallet
  getBasicPallets(): Promise<FindAllBasicPalletResponse[]>;

  // create basic pallet
  createBasicPallet(
    basicPallet: CreateBasicPalletRequest,
  ): Promise<CreateBasicPalletResponse>;

  // update basic pallet
  updateBasicPallet(
    basicPalletId: string,
    basicPallet: UpdateBasicPalletRequest,
  ): Promise<UpdateBasicPalletResponse>;

  // delete basic pallet
  deleteBasicPallet(basicPalletId: string): Promise<RemoveBasicPalletResponse>;
}
