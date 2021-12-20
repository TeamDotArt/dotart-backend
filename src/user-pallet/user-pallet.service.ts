import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
// Service
import { PrismaService } from '../common/prisma.service';
// Helper
import { jwtDecoded } from '../common/helpers/jwtDecoded';
// entity
import { UserPallet } from '../user-pallet/entities/user-pallet.entity';
import { User } from '../users/entities/user.entity';
// Dto
import { FindAllUserPalletResponse } from './dto/findAll-user-pallet.dto';
import { FindUserPalletResponse } from './dto/find-user-pallet.dto';
import { RemoveUserPalletResponse } from './dto/delete-user-pallet.dto';
import {
  UpdateUserPalletRequest,
  UpdateUserPalletResponse,
} from './dto/update-user-pallet.dto';
import {
  CreateUserPalletRequest,
  CreateUserPalletResponse,
} from './dto/create-user-pallet.dto';
import { DecodedDto } from '../auth/dto/decoded.dto';
import { UserPalletServiceInterface } from './interface/userPallet.service.interface';
import { UsersServiceInterface } from '../users/interface/users.service.interface';

@Injectable()
export class UserPalletService implements UserPalletServiceInterface {
  constructor(
    private prisma: PrismaService,
    @Inject('UsersServiceInterface')
    private readonly usersService: UsersServiceInterface,
  ) {}

  async create(
    req: FastifyRequest,
    data: CreateUserPalletRequest,
  ): Promise<CreateUserPalletResponse> {
    let decoded: DecodedDto = undefined;
    try {
      decoded = jwtDecoded(req.headers.authorization);
    } catch {
      throw new BadRequestException('reqが不正です。');
    }
    const user: User = await this.usersService.findUserById(decoded.id);
    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }
    if (!data.palletId) {
      throw new BadRequestException('palletIdが未入力です。');
    }
    const distictUserPallet: UserPallet =
      await this.prisma.userPallet.findFirst({
        where: { palletId: data.palletId },
      });

    if (distictUserPallet) {
      throw new BadRequestException('すでにuserpalletが存在します。');
    }
    await this.prisma.userPallet.create({
      data: {
        palletId: data.palletId,
        userId: data.userId,
        name: data.name,
        data: data.data,
      },
    });
    const userpallet: UserPallet = await this.prisma.userPallet.findFirst({
      where: { userId: user.userId },
    });
    const ret: CreateUserPalletResponse = {
      status: 201,
      message: 'ユーザーパレットを生成しました。',
      palletId: userpallet.palletId,
    };
    return ret;
  }

  async findAll(): Promise<FindAllUserPalletResponse[]> {
    return this.prisma.userPallet.findMany();
  }

  async findUserPalletId(palletId: string): Promise<FindUserPalletResponse> {
    if (!palletId) {
      throw new NotFoundException('palletIdが存在しません。');
    }
    const pallet = await this.prisma.userPallet.findUnique({
      where: { palletId: palletId },
    });
    if (!pallet) {
      throw new NotFoundException('palletが存在しません。');
    }
    const ret: FindUserPalletResponse = {
      palletId: pallet.palletId,
      name: pallet.name,
      data: pallet.data,
      createdAt: pallet.createdAt,
    };
    return ret;
  }

  async findUserPalletByName(name: string): Promise<FindUserPalletResponse> {
    if (!name) {
      throw new NotFoundException('palletnameが存在しません。');
    }
    const pallet = await this.prisma.userPallet.findFirst({
      where: { name: name },
    });
    if (!pallet) {
      throw new NotFoundException('palletが存在しません。');
    }
    const ret: FindUserPalletResponse = {
      palletId: pallet.palletId,
      name: pallet.name,
      data: pallet.data,
      createdAt: pallet.createdAt,
    };
    return ret;
  }

  async update(
    req: FastifyRequest,
    data: UpdateUserPalletRequest,
  ): Promise<UpdateUserPalletResponse> {
    let decoded: DecodedDto = undefined;
    try {
      decoded = jwtDecoded(req.headers.authorization);
    } catch {
      throw new BadRequestException('reqが不正です。');
    }
    if (!data.name) {
      throw new BadRequestException('nameが未入力です。');
    }
    const user: User = await this.usersService.findUserById(decoded.id);
    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }
    const userpallet: UserPallet = await this.prisma.userPallet.findFirst({
      where: { userId: user.userId },
    });
    if (!userpallet) {
      throw new NotFoundException('ユーザパレットが存在しません。');
    }
    await this.prisma.userPallet.update({
      where: { palletId: userpallet.palletId },
      data: {
        name: data.name,
        data: data.data,
      },
    });
    const ret: UpdateUserPalletResponse = {
      status: 201,
      message: '更新しました。',
      palletId: userpallet.palletId,
    };
    return ret;
  }

  async remove(req: FastifyRequest): Promise<RemoveUserPalletResponse> {
    let decoded: DecodedDto = undefined;
    try {
      decoded = jwtDecoded(req.headers.authorization);
    } catch {
      throw new BadRequestException('reqが不正です。');
    }
    const user: User = await this.usersService.findUserById(decoded.id);
    if (!user) {
      throw new NotFoundException('ユーザが存在しません。');
    }
    const userpallet: UserPallet = await this.prisma.userPallet.findFirst({
      where: { userId: user.userId },
    });
    if (!userpallet) {
      throw new NotFoundException('ユーザパレットが存在しません。');
    }
    await this.prisma.userPallet.delete({
      where: { palletId: userpallet.palletId },
    });
    const ret: RemoveUserPalletResponse = {
      status: 201,
      message: 'ユーザーパレットを削除しました。',
      palletId: userpallet.palletId,
    };
    return ret;
  }
}
