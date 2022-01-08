import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggerMiddleware } from './common/middleware/logger.middleware';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service'

const DB_DEV_URI = 'mongodb://localhost:27017/ChoTot';
const DB_PRODUCTION_URI = 'mongodb+srv://hansanwok:StrongPass2021@cluster0.anltn.mongodb.net/ChoTot?retryWrites=true&w=majority'

@Module({
  imports: [
    MongooseModule.forRoot(process.env.NODE_ENV === 'production' ? DB_PRODUCTION_URI : DB_DEV_URI),
    CatsModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    ProductsModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [AppService, CloudinaryService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes('*');
  }
}
