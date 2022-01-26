import { Injectable } from '@nestjs/common';
import {
  CreateImageUploaderDto,
  CreateImageUploaderResponse,
} from './dto/create-image-uploader.dto';
import ImgurClient from 'imgur';

@Injectable()
export class ImageUploaderService {
  #client: ImgurClient;
  constructor() {
    this.#client = new ImgurClient({ clientId: process.env.IMGUR_CLIENT_ID });
  }
  public async upload(
    createImageUploaderDto: CreateImageUploaderDto,
  ): Promise<CreateImageUploaderResponse> {
    const res = await this.#client.upload({
      image: createImageUploaderDto.image.replace(
        /^data:image\/\w+;base64,/,
        '',
      ),
      type: 'base64',
    });
    console.log(res[0].data);
    return res[0];
  }
}
