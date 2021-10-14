import { Injectable } from '@nestjs/common';
import { CreateUserpalletDto } from './dto/create-userpallet.dto';
import { UpdateUserpalletDto } from './dto/update-userpallet.dto';
import { PrismaService } from './../prisma.service';
import { UserPallet, Prisma } from '@prisma/client';

@Injectable()
export class UserpalletService {
  constructor(private prisma: PrismaService) {}
  create(createUserpalletDto: CreateUserpalletDto) {
    return 'This action adds a new userpallet';
  }

  findAll() {
    return this.prisma.userPallet.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} userpallet`;
  }

  update(id: number, updateUserpalletDto: UpdateUserpalletDto) {
    return `This action updates a #${id} userpallet`;
  }

  remove(id: number) {
    return `This action removes a #${id} userpallet`;
  }
}
