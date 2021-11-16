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

/** @implements {BasicPalletController}
 * BasicPalletControllerのインターフェース
 */
export interface BasicPalletControllerInterface {
  // ベーシックパレット取得の処理
  getBasicPallet(basicPalletId: string): Promise<FindBasicPalletResponse>;
  // 名前からベーシックパレットを取得する処理
  getBasicPalletByName(
    basicPalletName: string,
  ): Promise<FindBasicPalletResponse>;
  // すべてのベーシックパレット取得処理
  getBasicPallets(): Promise<FindAllBasicPalletResponse[]>;

  // ベーシックパレット作成処理
  createBasicPallet(
    basicPallet: CreateBasicPalletRequest,
  ): Promise<CreateBasicPalletResponse>;

  // ベーシックパレット更新処理
  updateBasicPallet(
    basicPalletId: string,
    basicPallet: UpdateBasicPalletRequest,
  ): Promise<UpdateBasicPalletResponse>;

  // ベーシックパレット削除処理
  deleteBasicPallet(basicPalletId: string): Promise<RemoveBasicPalletResponse>;
}
