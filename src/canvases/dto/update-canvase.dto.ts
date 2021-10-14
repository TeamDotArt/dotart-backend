import { PartialType } from '@nestjs/swagger';
import { CreateCanvaseDto } from './create-canvase.dto';

export class UpdateCanvaseDto extends PartialType(CreateCanvaseDto) {}
