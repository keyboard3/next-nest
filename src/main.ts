import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { nextJS } from "./next.middleware";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(nextJS);
  (global as any).nestApp = app;
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
