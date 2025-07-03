import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type UserDocument = User & BaseDocument;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: Types.ObjectId, ref: 'File', required: false })
  avatarId?: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
