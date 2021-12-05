import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {ExcludeProperty} from 'nestjs-mongoose-exclude'

export type CatDocument = Cat & Document;

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Cat {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
