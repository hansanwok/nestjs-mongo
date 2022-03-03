import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { User } from '../../users/schemas/user.schema'
import { Category } from '../../categories/schemas/category.schema'

export type ProductDocument = Product & mongoose.Document;

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class Product {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true })
  imageUrl: string;

  @Prop()
  location: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  description: string;

  // populate relationship

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  author: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true })
  category: Category;

}

const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.index({ name: 'text' });

export { ProductSchema }
