import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsDate, IsNotEmpty } from 'class-validator';
import { Constants } from 'src/common/constants';
import { Canvas } from 'src/canvases/entities/canvas.entity';

export class FindCanvasParam {
  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsNotEmpty()
  @IsString()
  canvasId: Canvas['canvasId'];

  @ApiProperty({ description: Constants.PROPERTY_CANVAS_NAME })
  @IsString()
  canvasName: Canvas['canvasName'];
}

export class FindCanvasResponse {
  @ApiProperty({ description: Constants.PROPERTY_CANVAS_ID })
  @IsString()
  canvasId: Canvas['canvasId'];

  @ApiProperty({ description: Constants.PROPERTY_CANVAS_NAME })
  @IsString()
  canvasName: Canvas['canvasName'];

  @ApiProperty({ description: Constants.PROPERTY_CANVAS_RANGE })
  @IsNumber()
  canvasRange: Canvas['canvasRange'];

  @ApiProperty({ description: Constants.PROPERTY_PALLET })
  @IsString()
  pallet: Canvas['pallet'];

  @ApiProperty({ description: Constants.PROPERTY_CANVASES_DATA })
  @IsString()
  canvasesData: Canvas['canvasesData'];

  @ApiProperty({ description: Constants.PROPERTY_CREATED_AT })
  @IsDate()
  createdAt: Canvas['createdAt'];

  @ApiProperty({ description: Constants.PROPERTY_UPDATED_AT })
  @IsDate()
  updatedAt: Canvas['updatedAt'];
}
