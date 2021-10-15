import { PartialType } from '@nestjs/swagger';
import { CreateUserpalletDto } from './create-userpallet.dto';

export class UpdateUserpalletDto extends PartialType(CreateUserpalletDto) {}
