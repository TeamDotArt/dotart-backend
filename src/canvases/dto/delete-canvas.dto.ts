import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Constants } from '../../common/constants';
import { Canvas } from '../../canvases/entities/canvas.entity';
import { ResponseBase } from '../../common/dtoBase/response.dtoBase';

export class RemoveCanvasRequest {
  @ApiProperty({ description: Constants.PROPERTY_CANVAS_ID })
  @IsString()
  canvasId: Canvas['canvasId'];
}

export class RemoveCanvasResponse extends ResponseBase {
  @ApiProperty({ description: Constants.PROPERTY_CANVAS_ID })
  @IsString()
  canvasId: Canvas['canvasId'];
}
