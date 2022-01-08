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

  @Prop()
  name: string;

  @Prop()
  dateOfBirth: Date;

  @Prop()
  avatarUrl: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
