import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { File } from './file.schema';
import { BaseService } from '~/base/base.service';
import { uploadFileToS3, generateS3Key, S3UploadOptions } from '~/common/s3Utils';
import { FileUpload } from 'graphql-upload-ts';

type CreateFileInput = {
  url: string;
  type: string;
  userId: Types.ObjectId;
};

@Injectable()
export class FileService extends BaseService<Documents.File, CreateFileInput> {
  constructor(@InjectModel(File.name) private fileModel: Model<Documents.File>) {
    super(fileModel);
  }

  async uploadFile(
    fileUpload: FileUpload,
    fileType: string,
    userId: Types.ObjectId,
  ): Promise<Documents.File> {
    try {
      // Resolve the file upload Promise
      const resolvedUpload = await Promise.resolve(fileUpload);

      if (
        !resolvedUpload ||
        !resolvedUpload.createReadStream ||
        typeof resolvedUpload.createReadStream !== 'function'
      ) {
        throw new Error('Invalid file upload format');
      }

      // Extract file information
      const { createReadStream, filename, mimetype } = resolvedUpload;
      const stream = createReadStream();

      // Convert stream to buffer
      const chunks: Buffer[] = [];
      for await (const chunk of stream) {
        chunks.push(chunk);
      }
      const fileBuffer = Buffer.concat(chunks);

      // Generate unique S3 key
      const s3Key = generateS3Key(filename, 'uploads');

      // Upload to S3
      const uploadOptions: S3UploadOptions = {
        key: s3Key,
        contentType: mimetype,
        metadata: {
          originalName: filename,
          uploadedBy: String(userId),
          fileType: fileType,
        },
      };

      const uploadResult = await uploadFileToS3(fileBuffer, uploadOptions);

      if (!uploadResult.success) {
        throw new Error(`Failed to upload file: ${uploadResult.error}`);
      }

      // Save file record to database
      return this.create({
        url: uploadResult.location!,
        type: fileType,
        userId: userId,
      });
    } catch (error) {
      console.error('Error in uploadFile service:', error);
      throw new Error(
        `File upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
    }
  }
}
