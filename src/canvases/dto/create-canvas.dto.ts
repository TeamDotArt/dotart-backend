import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Constants } from '../../common/constants';
import { Canvas } from '../../canvases/entities/canvas.entity';
import { ResponseBase } from '../../common/dtoBase/response.dtoBase';

export class CreateCanvasRequest {
  @ApiProperty({ description: Constants.PROPERTY_CANVAS_ID })
  @IsString()
  @IsNotEmpty()
  canvasId: Canvas['canvasId'];

  @ApiProperty({ description: Constants.PROPERTY_USER_ID })
  @IsString()
  @IsNotEmpty()
  userId: Canvas['userId'];

  @ApiProperty({ description: Constants.PROPERTY_CANVAS_NAME })
  @IsString()
  @IsNotEmpty()
  canvasName: Canvas['canvasName'];

  @ApiProperty({ description: Constants.PROPERTY_CANVAS_RANGE })
  @IsNumber()
  @IsNotEmpty()
  canvasRange: Canvas['canvasRange'];

  @ApiProperty({ description: Constants.PROPERTY_PALLET })
  @IsString()
  @IsNotEmpty()
  pallet: Canvas['pallet'];

  @ApiProperty({ description: Constants.PROPERTY_CANVASES_DATA })
  @IsString()
  @IsNotEmpty()
  canvasesData: Canvas['canvasesData'];
}

export class CreateCanvasResponse extends ResponseBase {
  @ApiProperty({ description: Constants.PROPERTY_CANVAS_ID })
  @IsString()
  canvasId: Canvas['canvasId'];
}
