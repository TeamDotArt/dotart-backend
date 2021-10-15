import { PartialType } from '@nestjs/swagger';
import { CreateUserPalletDto } from './create-user-pallet.dto';

export class UpdateUserPalletDto extends PartialType(CreateUserPalletDto) {}
