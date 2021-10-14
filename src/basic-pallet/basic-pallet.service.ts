import { Injectable } from '@nestjs/common';
import { Prisma, BasicPallet } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

// Prismaの型定義でよさそう
// import { CreateBasicPalletDto } from './dto/create-basic-pallet.dto';
// import { UpdateBasicPalletDto } from './dto/update-basic-pallet.dto';

@Injectable()
export class BasicPalletService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.BasicPalletCreateInput): Promise<BasicPallet> {
    return this.prisma.basicPallet.create({ data });
  }

  async findAll(): Promise<BasicPallet[]> {
    return this.prisma.basicPallet.findMany();
  }

  async findOne(id: number) {
    return this.prisma.basicPallet.findUnique({
      where: { id: id },
    });
  }

  async update(
    id: number,
    data: Prisma.BasicPalletUpdateInput,
  ): Promise<BasicPallet> {
    return this.prisma.basicPallet.update({
      where: { id: id },
      data,
    });
  }

  async remove(id: number): Promise<BasicPallet> {
    return this.prisma.basicPallet.delete({
      where: { id: id },
    });
  }
}
