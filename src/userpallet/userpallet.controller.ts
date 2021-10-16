import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { UserpalletService } from './userpallet.service';
import { CreateUserpalletDto } from './dto/create-userpallet.dto';
import { UpdateUserpalletDto } from './dto/update-userpallet.dto';
import { UserPallet, Prisma } from '@prisma/client';

// TODO: ApiResponseを記載する
@ApiTags('userpallet')
@Controller('userpallet')
export class UserpalletController {
  constructor(private readonly userpalletService: UserpalletService) {}

  @Post()
  async create(
    @Body() data: Prisma.UserPalletCreateInput,
  ): Promise<UserPallet> {
    return this.userpalletService.create(data);
  }

  @Get()
  findAll() {
    return this.userpalletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userpalletService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserpalletDto: UpdateUserpalletDto,
  ) {
    return this.userpalletService.update(+id, updateUserpalletDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userpalletService.remove(+id);
  }
}
