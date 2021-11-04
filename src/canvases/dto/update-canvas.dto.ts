import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Constants } from 'src/common/constants';
import { Canvas } from 'src/canvases/entities/canvas.entity';

export class UpdateCanvasRequest {
  @ApiProperty({ description: Constants.PROPERTY_CANVAS_ID })
  @IsString()
  canvasId: Canvas['canvasId'];

  @ApiProperty({ description: Constants.PROPERTY_CANVAS_NAME })
  @IsString()
  canvasName: Canvas['canvasName'];

  @ApiProperty({ description: Constants.PROPERTY_PALLET })
  @IsString()
  @IsNotEmpty()
  pallet: Canvas['pallet'];

  @ApiProperty({ description: Constants.PROPERTY_CANVASES_DATA })
  @IsString()
  @IsNotEmpty()
  canvasesData: Canvas['canvasesData'];
}

export class UpdateCanvasResponse {
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
