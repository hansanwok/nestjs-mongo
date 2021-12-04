import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CatDocument = Cat & Document;

@Schema()
export class Cat {
  @Prop()
  name = String;

  @Prop()
  age: Number;

  @Prop()
  breed: String;
}

export const CatSchema = SchemaFactory.createForClass(Cat);
