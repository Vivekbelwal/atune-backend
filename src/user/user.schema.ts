import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & BaseDocument;

@Schema({ timestamps: true })
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
