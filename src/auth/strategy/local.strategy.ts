import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '@prisma/client';
import { AuthService } from '../auth.service';

type PasswordOmitUser = Omit<User, 'password'>;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(data: User): Promise<PasswordOmitUser> {
    const user = await this.authService.validateUser(data);

    if (!user) {
      throw new UnauthorizedException('不正なリクエストです。');
    }

    return user;
  }
}
