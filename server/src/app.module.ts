import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CatsModule } from './cats/cats.module';
const NODE_ENV = process.env.NODE_ENV || 'development';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${NODE_ENV}.env`,
    }),
    MongooseModule.forRoot(process.env.mongoUrl, {
      useNewUrlParser: true,
    }),
    CatsModule,
  ],
})
export class ApplicationModule {}
