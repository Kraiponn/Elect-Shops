import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import helmet from 'helmet';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 8000;
  const appMode = process.env.NODE_ENV;

  // Middlewares config
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({
      origin: ['http://localhost:5000'],
    });
  }

  app.use(helmet());
  app.use(csurf());

  await app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port, And ${appMode} mode`);
  });
}
bootstrap();
