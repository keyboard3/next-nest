import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import nextJS from './next-bridge.middleware';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(nextJS);
  (global as any).nestApp = app;
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
