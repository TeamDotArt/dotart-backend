import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';
import {
  FastifyInstance,
  FastifyLoggerInstance,
  FastifyRequest,
} from 'fastify';
import {
  IncomingMessage,
  IncomingHttpHeaders,
  Server,
  ServerResponse,
} from 'http';
import { Socket } from 'net';
import { Constants } from 'src/common/constants';

export class LogOutUserRequest implements FastifyRequest {
  id: any;
  params: unknown;
  raw: IncomingMessage;
  query: unknown;
  headers: IncomingHttpHeaders;
  log: FastifyLoggerInstance;
  server: FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse,
    FastifyLoggerInstance
  >;
  body: unknown;
  validationError?: Error & { validation: any; validationContext: string };
  req: IncomingMessage;
  ip: string;
  ips?: string[];
  hostname: string;
  url: string;
  protocol: 'http' | 'https';
  method: string;
  routerPath: string;
  routerMethod: string;
  is404: boolean;
  socket: Socket;
  connection: Socket;
}

export class LogOutUserResponse {
  @ApiProperty({ description: Constants.VERIFY_STATUS })
  @IsNumber()
  status: number;

  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsString()
  message: string;
}
