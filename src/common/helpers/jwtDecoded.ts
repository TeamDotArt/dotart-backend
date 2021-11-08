import { DecodedDto } from '../../auth/dto/decoded.dto';
import jwt_decode from 'jwt-decode';

export const jwtDecoded = (jwt: string): DecodedDto => {
  const decoded: DecodedDto = jwt_decode(jwt);
  return decoded;
};
