import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ExcludeProperty } from 'nestjs-mongoose-exclude'

export type UserDocument = User & Document;

@Schema({ timestamps: { createdAt: 'createdAt' } })
export class User {
  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ required: true })
  @ExcludeProperty()
  password: string;

  @Prop({default: null})
  name: string;

  @Prop({default: null})
  phone: string;

  @Prop({default: null})
  dateOfBirth: Date;

  @Prop({default: null})
  avatarUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
