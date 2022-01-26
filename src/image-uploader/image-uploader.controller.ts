import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOperation, ApiTags, ApiResponse, ApiBody } from '@nestjs/swagger';
import { ImageUploaderService } from './image-uploader.service';
import {
  CreateImageUploaderDto,
  ImageUploader,
} from './dto/create-image-uploader.dto';

@ApiTags('image-uploader')
@Controller('image-uploader')
export class ImageUploaderController {
  constructor(private readonly imageUploaderService: ImageUploaderService) {}

  @Post()
  // Swagger定義
  @ApiOperation({
    summary: '画像をImgurにアップロードする',
  })
  @ApiResponse({ status: HttpStatus.OK, type: ImageUploader })
  @ApiBody({
    type: CreateImageUploaderDto,
    description: 'base64で画像を指定する',
  })
  upload(@Body() createImageUploaderDto: CreateImageUploaderDto) {
    return this.imageUploaderService.upload(createImageUploaderDto);
  }
}
