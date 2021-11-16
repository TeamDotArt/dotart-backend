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

/** @implements {BasicPalletService}
 * BasicPalletServiceのインターフェース
 */
export interface BasicPalletServiceInterface {
  // 固有IDからベーシックパレット検索処理
  findBasicPalletId(basicPalletId: string): Promise<FindBasicPalletResponse>;
  // 名前からベーシックパレット検索処理
  findBasicPalletByName(
    basicPalletName: string,
  ): Promise<FindBasicPalletResponse>;
  // すべてのベーシックパレット検索処理
  findAll(): Promise<FindAllBasicPalletResponse[]>;

  // ベーシックパレット作成処理
  create(
    basicPallet: CreateBasicPalletRequest,
  ): Promise<CreateBasicPalletResponse>;

  // ベーシックパレット更新処理
  update(
    basicPalletId: string,
    basicPallet: UpdateBasicPalletRequest,
  ): Promise<UpdateBasicPalletResponse>;

  // ベーシックパレット削除処理
  remove(basicPalletId: string): Promise<RemoveBasicPalletResponse>;
}
