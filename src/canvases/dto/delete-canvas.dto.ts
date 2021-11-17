import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { Constants } from '../../common/constants';
import { Canvas } from '../../canvases/entities/canvas.entity';

export class RemoveCanvasRequest {
  @ApiProperty({ description: Constants.PROPERTY_CANVAS_ID })
  @IsString()
  canvasId: Canvas['canvasId'];
}

export class RemoveCanvasResponse {
  @ApiProperty({ description: Constants.VERIFY_STATUS })
  @IsNumber()
  status: number;

  @ApiProperty({ description: Constants.VERIFY_MESSAGE })
  @IsString()
  message: string;

  @ApiProperty({ description: Constants.PROPERTY_CANVAS_ID })
  @IsString()
  canvasId: Canvas['canvasId'];
}
