/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

declare const module: any;

async function bootstrap() {
  const port = process.env.NESTJS_APP_DOCKER_PORT;
  const nextJsPort = process.env.NEXTJS_APP_LOCAL_PORT;

  const app = await NestFactory.create(AppModule);
  // Log the ports for debugging
  console.log(`NestJS running on port: ${port}`);
  console.log(`Next.js client allowed origin: http://localhost:${nextJsPort}`);

  app.use(cookieParser());

  // Enable CORS with credentials for the specific origin
  app.enableCors({
    origin: `http://localhost:${nextJsPort}`,
    credentials: true,
  });

  // Start the NestJS application
  await app.listen(port).then(() => {
    console.log(`Server started at http://localhost:${port}`);
  });

  // This is necessary to make the hot-reload work with Docker
  // Hot-reload setup
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
