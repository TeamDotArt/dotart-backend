import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const apiPrefix = 'api/v1';
  const app: NestFastifyApplication =
    await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: true }),
      {
        logger: ['error', 'warn', 'debug', 'verbose', 'log'],
      },
    );
  app.setGlobalPrefix(apiPrefix);

  // Corsの有効化
  app.enableCors({
    origin: '*',
    allowedHeaders:
      'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  });

  // アプリケーションレベルでリクエストバリデーション
  app.useGlobalPipes(new ValidationPipe());

  // swagger定義
  const config = new DocumentBuilder()
    .setTitle('DotArt API')
    .setDescription('DotArtのバックエンドAPI')
    .setVersion('0.0.5')
    .setLicense(
      'Apache-2.0 License',
      'https://github.com/TeamDotArt/dotart-backend/blob/develop/LICENSE',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`listen to http://localhost:${port}/${apiPrefix}`);
}
bootstrap();
