import { Injectable } from '@nestjs/common';
import { UserPallet, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserpalletService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserPalletCreateInput): Promise<UserPallet> {
    return this.prisma.userPallet.create({ data });
  }

  async findAll(): Promise<UserPallet[]> {
    return this.prisma.userPallet.findMany();
  }

  async findOne(id: number) {
    return this.prisma.userPallet.findUnique({
      where: { id: id },
    });
  }

  async update(
    id: number,
    data: Prisma.UserPalletUpdateInput,
  ): Promise<UserPallet> {
    return this.prisma.userPallet.update({
      where: { id: id },
      data,
    });
  }

  async remove(id: number): Promise<UserPallet> {
    return this.prisma.userPallet.delete({
      where: { id: id },
    });
  }
}
