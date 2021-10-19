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
import { UserPallet } from '@prisma/client';
import { UserpalletService } from './user-pallet.service';
import { CreateUserPalletDto } from './dto/create-user-pallet.dto';
import { UpdateUserPalletDto } from './dto/update-user-pallet.dto';

// TODO: ApiResponseを記載する
@ApiTags('user-pallet')
@Controller('user-pallet')
export class UserPalletController {
  constructor(private readonly userPalletService: UserpalletService) {}

  @Post()
  create(@Body() createUserPalletDto: CreateUserPalletDto) {
    return;
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
  update(
    @Param('id') id: string,
    @Body() updateUserPalletDto: UpdateUserPalletDto,
  ) {
    return;
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<UserPallet> {
    return this.userPalletService.remove(+id);
  }
}
