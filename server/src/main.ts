import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { getApi, rootMiddleware } from './bridge';

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  app.use(rootMiddleware);
  (global as any).serverFetch = getApi.bind(
    this,
    app.getHttpAdapter().getInstance(),
  );
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
