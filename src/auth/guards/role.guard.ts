import { Role } from '@prisma/client';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Inject,
} from '@nestjs/common';
import { DecodedDto } from '../dto/decoded.dto';
import { User } from '../../users/entities/user.entity';
import { jwtDecoded } from '../../common/helpers/jwtDecoded';
import { UsersServiceInterface } from '../../users/interface/users.service.interface';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @Inject('UsersServiceInterface')
    private _usersService: UsersServiceInterface,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const decoded: DecodedDto = jwtDecoded(req.headers.authorization);
    const user: User = await this._usersService.findUserById(decoded.id);
    const role = user.role;
    if (role === Role.ADMIN) {
      return true;
    }
    return false;
  }
}
