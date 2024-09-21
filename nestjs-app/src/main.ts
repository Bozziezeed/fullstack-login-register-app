/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

declare const module: any;

async function bootstrap() {
  const port = process.env.NESTJS_APP_DOCKER_PORT;
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Enable CORS so we can access the application from a different origin
  app.enableCors({
    origin: `http://localhost:${process.env.NEXTJS_APP_LOCAL_PORT}`,
    credentials: true,
  });
  // Start the application
  await app.listen(port).then((_value) => {
    console.log(`Server started at http://localhost:${port}`);
  });

  // This is necessary to make the hot-reload work with Docker
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
