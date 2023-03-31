import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('E-commerce')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('category', 'Endpoints for managing categories')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    // @ts-ignore
    tags: ['category'],
  });
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
