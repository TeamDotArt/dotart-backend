import { FastifyRequest } from 'fastify';
import {
  CreateCanvasRequest,
  CreateCanvasResponse,
} from '../dto/create-canvas.dto';
import { FindAllCanvasResponse } from '../dto/findAll-canvas.dto';
import { FindCanvasResponse } from '../dto/find-canvas.dto';
import {
  UpdateCanvasRequest,
  UpdateCanvasResponse,
} from '../dto/update-canvas.dto';
import {
  RemoveCanvasRequest,
  RemoveCanvasResponse,
} from '../dto/delete-canvas.dto';

export interface CanvasesServiceInterface {
  // get pasic pallet
  findCanvasId(canvasId: string): Promise<FindCanvasResponse>;
  findCanvasByName(canvasNaeme: string): Promise<FindCanvasResponse>;

  // get all basic pallet
  findAll(authorization: FastifyRequest): Promise<FindAllCanvasResponse[]>;

  // create basic pallet
  create(
    authorization: FastifyRequest,
    canvas: CreateCanvasRequest,
  ): Promise<CreateCanvasResponse>;

  // update basic pallet
  update(
    authorization: FastifyRequest,
    canvas: UpdateCanvasRequest,
  ): Promise<UpdateCanvasResponse>;

  // delete basic pallet
  remove(
    authorization: FastifyRequest,
    canvas: RemoveCanvasRequest,
  ): Promise<RemoveCanvasResponse>;
}
