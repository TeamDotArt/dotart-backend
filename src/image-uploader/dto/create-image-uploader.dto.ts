import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { Constants } from 'src/common/constants';

export class CreateImageUploaderDto {
  @ApiProperty({ description: Constants.PROPERTY_IMAGE_UPLOADER_ID })
  @IsString()
  image: string;
}

export class ImageUploader {
  id: string;
  title?: string;
  description?: string;
  datetime: number;
  type: string;
  animated: boolean;
  width: number;
  height: number;
  size: number;
  views: number;
  bandwidth: number;
  vote?: any;
  favorite: boolean;
  nsfw?: any;
  section?: string;
  account_url?: any;
  account_id: number;
  is_ad: boolean;
  in_most_viral: boolean;
  tags: [];
  ad_type: number;
  ad_url: string;
  in_gallery: boolean;
  deletehash: string;
  name: string;
  link: string;
}

export type CreateImageUploaderResponse = {
  data?: ImageUploader;
  success: boolean;
  status: number;
};
