import { Role } from '@prisma/client';

export class DecodedDto {
  id: number;
  userId: string;
  name: string;
  role: Role;
  iat: number;
  exp: number;
}
