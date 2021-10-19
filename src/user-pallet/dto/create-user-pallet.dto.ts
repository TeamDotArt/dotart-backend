import { Exclude } from 'class-transformer';
export class CreateUserPalletDto {
  palletId: number;
  name: string;
  data: string;
  @Exclude()
  createdAt: string;
}
