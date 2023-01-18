import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({ origin: ['https://docs.nestjs.com'] });

  const docConfig = new DocumentBuilder()
    .setTitle('Test task bank app')
    .setDescription('REST API documentation')
    .setVersion('0.0.1')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('/api/docs', app, document);

  await app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
}
bootstrap();
