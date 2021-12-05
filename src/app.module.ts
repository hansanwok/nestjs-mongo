import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';

const DB_DEV_URI = 'mongodb://localhost:27017/ChoTot';
const DB_PRODUCTION_URI = 'mongodb+srv://hansanwok:StrongPass2021@cluster0.anltn.mongodb.net/ChoTot?retryWrites=true&w=majority'

@Module({
  imports: [MongooseModule.forRoot(DB_DEV_URI), CatsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
