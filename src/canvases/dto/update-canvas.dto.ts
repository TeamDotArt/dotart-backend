import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { Constants } from 'src/common/constants';
import { Canvas } from 'src/canvases/entities/canvas.entity';
import { ResponseBase } from 'src/common/dtoBase/response.dtoBase';

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

export class UpdateCanvasResponse extends ResponseBase {
  @ApiProperty({ description: Constants.PROPERTY_CANVAS_ID })
  @IsString()
  canvasId: Canvas['canvasId'];
}
