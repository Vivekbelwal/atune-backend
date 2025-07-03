import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

export type FileDocument = File & BaseDocument;

@Schema({ timestamps: true })
export class File {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  type: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;
}

export const FileSchema = SchemaFactory.createForClass(File);
