import { PartialType } from '@nestjs/swagger';
import { CreateBasicPalletDto } from './create-basic-pallet.dto';

export class UpdateBasicPalletDto extends PartialType(CreateBasicPalletDto) {}
