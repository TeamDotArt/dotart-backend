import { Exclude } from 'class-transformer';

export class ConfirmedUserDto {
  id: number;
  userId: string;
  email: string;
  name: string;
  role: number;
  @Exclude()
  password: string;
  @Exclude()
  emailVerified: boolean;
  @Exclude()
  hashActivation: string;
  @Exclude()
  active: boolean;
  @Exclude()
  createdAt: string;
  @Exclude()
  confirmedAt: string;
}
