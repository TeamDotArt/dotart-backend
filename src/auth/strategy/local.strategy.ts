import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { User } from '@prisma/client';

type PasswordOmitUser = Omit<User, 'password'>;

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(
    userId: User['userId'],
    password: User['password'],
  ): Promise<PasswordOmitUser> {
    const user = await this.authService.validateUser(userId, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
