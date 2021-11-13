import { FastifyRequest } from 'fastify';
import {
  CreateCanvasRequest,
  CreateCanvasResponse,
} from '../dto/create-canvas.dto';
import { FindAllCanvasResponse } from '../dto/findAll-canvas.dto';
import { FindCanvasParam, FindCanvasResponse } from '../dto/find-canvas.dto';
import {
  UpdateCanvasRequest,
  UpdateCanvasResponse,
} from '../dto/update-canvas.dto';
import { RemoveCanvasResponse } from '../dto/delete-canvas.dto';

export interface CanvasesControllerInterface {
  // get canvas
  getCanvas(canvasParam: FindCanvasParam): Promise<FindCanvasResponse>;
  getCanvasByName(canvasParam: FindCanvasParam): Promise<FindCanvasResponse>;
  // get all canvases
  getCanvases(authorization: FastifyRequest): Promise<FindAllCanvasResponse[]>;

  // create canvas
  createCanvas(
    authorization: FastifyRequest,
    canvas: CreateCanvasRequest,
  ): Promise<CreateCanvasResponse>;

  // update canvas
  updateCanvas(
    authorization: FastifyRequest,
    canvas: UpdateCanvasRequest,
  ): Promise<UpdateCanvasResponse>;

  // delete canvas
  deleteCanvas(
    authorization: FastifyRequest,
    canvas: RemoveCanvasResponse,
  ): Promise<RemoveCanvasResponse>;
}
