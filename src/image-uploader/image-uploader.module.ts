import { Module } from '@nestjs/common';
import { ImageUploaderService } from './image-uploader.service';
import { ImageUploaderController } from './image-uploader.controller';

@Module({
  controllers: [ImageUploaderController],
  providers: [ImageUploaderService],
})
export class ImageUploaderModule {}
