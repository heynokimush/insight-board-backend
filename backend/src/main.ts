import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'reflect-metadata';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
  app.enableCors({
    origin: 'https://insightboard.duckdns.org', // 개발용 (나중엔 도메인 제한)
    credentials: true,
  });
  app.setGlobalPrefix('api');
}

bootstrap();
