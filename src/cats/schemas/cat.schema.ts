import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop({ required: true })
  name: string;

  @Prop()
  age: number;

  @Prop()
  breed: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
