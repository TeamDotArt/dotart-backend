import { Role } from '@prisma/client';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import jwt_decode from 'jwt-decode';
import { DecodedDto } from '../dto/decoded.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const decoded: DecodedDto = jwt_decode(req.headers.authorization);
    const user: User = await this.usersService.findOne(decoded.id);
    const role = user.role;
    if (role === Role.ADMIN) {
      return true;
    }
    return false;
  }
}