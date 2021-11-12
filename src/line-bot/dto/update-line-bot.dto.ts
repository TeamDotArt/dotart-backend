import { PartialType } from '@nestjs/swagger';
import { CreateLineBotDto } from './create-line-bot.dto';

export class UpdateLineBotDto extends PartialType(CreateLineBotDto) {}
