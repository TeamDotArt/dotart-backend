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
  // キャンバスの検索処理
  findCanvasId(canvasId: string): Promise<FindCanvasResponse>;
  // 名前からキャンバスを検索する処理
  findCanvasByName(canvasNaeme: string): Promise<FindCanvasResponse>;

  // すべてのキャンバスの検索処理
  findAll(authorization: FastifyRequest): Promise<FindAllCanvasResponse[]>;

  // キャンバスの作成処理
  create(
    authorization: FastifyRequest,
    canvas: CreateCanvasRequest,
  ): Promise<CreateCanvasResponse>;

  // キャンバスの更新処理
  update(
    authorization: FastifyRequest,
    canvas: UpdateCanvasRequest,
  ): Promise<UpdateCanvasResponse>;

  // キャンバスの削除処理
  remove(
    authorization: FastifyRequest,
    canvas: RemoveCanvasRequest,
  ): Promise<RemoveCanvasResponse>;
}
