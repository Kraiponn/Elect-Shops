import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT') || 8080;
  const appMode = configService.get<string>('NODE_ENV') || 'development';

  // Middlewares config
  if (appMode === 'development') {
    app.enableCors();
  } else {
    app.enableCors({
      origin: ['http://localhost:5000'],
    });
  }

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(helmet());
  // app.use(csurf());

  await app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port, And ${appMode} mode`);
  });
}

bootstrap();
