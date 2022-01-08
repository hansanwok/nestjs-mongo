import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategoryDocument = Category & Document;

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Category {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ required: true})
  imageUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(Category);
