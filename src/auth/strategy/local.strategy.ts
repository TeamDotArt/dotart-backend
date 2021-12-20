import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthServiceInterface } from '../interface/auth.service.interface';

type PasswordOmitUser = Omit<User, 'password'>;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AuthServiceInterface')
    private readonly _authService: AuthServiceInterface,
  ) {
    super();
  }

  async validate(data: User): Promise<PasswordOmitUser> {
    const user = await this._authService.validateUser(data);

    if (!user) {
      throw new UnauthorizedException('不正なリクエストです。');
    }

    return user;
  }
}
