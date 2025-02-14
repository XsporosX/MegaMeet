import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }))
  app.enableCors();

  const swaggerConfig = new DocumentBuilder()
  .setTitle('Demo nest')
  .setDescription("This is an API built by Nest to showcase MegaMeet's functionalities.")
  .setVersion('1.0')
  .addBearerAuth()
  .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT ?? 3000;
  
  await app.listen(port);
  console.log(`Server running on port ${port}`);
}
void bootstrap();
