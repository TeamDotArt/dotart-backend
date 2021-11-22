import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { Constants } from 'src/common/constants';
import { Canvas } from 'src/canvases/entities/canvas.entity';
import { ResponseBase } from 'src/common/dtoBase/response.dtoBase';

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
