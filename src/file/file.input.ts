import { InputType, Field } from '@nestjs/graphql';
import { GraphQLUpload, FileUpload } from 'graphql-upload-ts';

@InputType()
export class UploadFileInput {
  @Field(() => GraphQLUpload, { description: 'File to upload' })
  file: FileUpload;

  @Field({ description: 'File type/category' })
  fileType: string;
}
