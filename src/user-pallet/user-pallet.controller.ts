import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UserPallet, Prisma } from '@prisma/client';
import { UserpalletService } from './user-pallet.service';

// TODO: ApiResponseを記載する
@ApiTags('user-pallet')
@Controller('user-pallet')
export class UserPalletController {
  constructor(private readonly userPalletService: UserpalletService) {}

  @Post()
  create(@Body() data: Prisma.UserPalletCreateInput): Promise<UserPallet> {
    return this.userPalletService.create(data);
  }

  @Get()
  findAll(): Promise<UserPallet[]> {
    return this.userPalletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserPallet> {
    return this.userPalletService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.UserPalletUpdateInput) {
    return this.userPalletService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserPallet> {
    return this.userPalletService.remove(+id);
  }
}
