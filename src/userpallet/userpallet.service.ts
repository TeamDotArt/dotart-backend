import { Injectable } from '@nestjs/common';
import { CreateUserpalletDto } from './dto/create-userpallet.dto';
import { UpdateUserpalletDto } from './dto/update-userpallet.dto';
import { UserPallet, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserpalletService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.UserPalletCreateInput) {
    return this.prisma.userPallet.create({ data });
  }

  findAll() {
    return this.prisma.userPallet.findMany();
  }

  async findOne(id: number) {
    return this.prisma.userPallet.findUnique({
      where: { id: id },
    });
  }

  update(id: number, updateUserpalletDto: UpdateUserpalletDto) {
    return `This action updates a #${id} userpallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} userpallet`;
  }
}
