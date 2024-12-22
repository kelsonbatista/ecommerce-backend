import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativando a validação global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove qualquer propriedade que não esteja no DTO
      forbidNonWhitelisted: true, // Lança um erro se o DTO tiver propriedades não permitidas
      transform: true, // Transforma automaticamente os tipos dos dados para o tipo definido no DTO
    }),
  );

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
