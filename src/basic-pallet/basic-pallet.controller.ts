import { Prisma, BasicPallet } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BasicPalletService } from './basic-pallet.service';

// Prismaの型定義でよさそう
// import { CreateBasicPalletDto } from './dto/create-basic-pallet.dto';
// import { UpdateBasicPalletDto } from './dto/update-basic-pallet.dto';

@Controller('basic-pallet')
export class BasicPalletController {
  constructor(private readonly basicPalletService: BasicPalletService) {}

  @Post()
  create(@Body() data: Prisma.BasicPalletCreateInput): Promise<BasicPallet> {
    return this.basicPalletService.create(data);
  }

  @Get()
  findAll(): Promise<BasicPallet[]> {
    return this.basicPalletService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BasicPallet> {
    return this.basicPalletService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Prisma.BasicPalletUpdateInput) {
    return this.basicPalletService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<BasicPallet> {
    return this.basicPalletService.remove(+id);
  }
}
