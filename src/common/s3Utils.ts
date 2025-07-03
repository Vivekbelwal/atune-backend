import {
  S3Client,
  PutObjectCommand,
  PutObjectCommandInput,
  ObjectCannedACL,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Readable } from 'stream';
import { getEnv } from './envUtils';

// Interface for upload options
export interface S3UploadOptions {
  bucket?: string;
  key: string;
  contentType?: string;
  metadata?: Record<string, string>;
  acl?: ObjectCannedACL;
}

// Interface for upload result
export interface S3UploadResult {
  success: boolean;
  key: string;
  location?: string;
  etag?: string;
  error?: string;
}

// S3 client configuration
let s3Client: S3Client | null = null;

/**
 * Initialize S3 client with configuration from environment variables
 */
function getS3Client(): S3Client {
  if (!s3Client) {
    const region = getEnv('AWS_REGION', 'us-east-1');
    const accessKeyId = getEnv('AWS_ACCESS_KEY_ID');
    const secretAccessKey = getEnv('AWS_SECRET_ACCESS_KEY');

    s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
  }
  return s3Client;
}

/**
 * Upload a file buffer to S3
 * @param fileBuffer - The file buffer to upload
 * @param options - Upload options including bucket, key, contentType, etc.
 * @returns Promise<S3UploadResult> - Upload result with success status and details
 */
export async function uploadFileToS3(
  fileBuffer: Buffer,
  options: S3UploadOptions,
): Promise<S3UploadResult> {
  try {
    const client = getS3Client();
    const defaultBucket = getEnv('AWS_S3_BUCKET');

    const uploadParams: PutObjectCommandInput = {
      Bucket: options.bucket || defaultBucket,
      Key: options.key,
      Body: fileBuffer,
      ContentType: options.contentType || 'application/octet-stream',
      Metadata: options.metadata,
      ACL: options.acl,
    };

    const command = new PutObjectCommand(uploadParams);
    const result = await client.send(command);

    return {
      success: true,
      key: options.key,
      location: `https://${uploadParams.Bucket}.s3.amazonaws.com/${options.key}`,
      etag: result.ETag,
    };
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    return {
      success: false,
      key: options.key,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Upload a large file to S3 using multipart upload
 * @param fileBuffer - The file buffer to upload
 * @param options - Upload options including bucket, key, contentType, etc.
 * @returns Promise<S3UploadResult> - Upload result with success status and details
 */
export async function uploadLargeFileToS3(
  fileBuffer: Buffer,
  options: S3UploadOptions,
): Promise<S3UploadResult> {
  try {
    const client = getS3Client();
    const defaultBucket = getEnv('AWS_S3_BUCKET');

    const upload = new Upload({
      client,
      params: {
        Bucket: options.bucket || defaultBucket,
        Key: options.key,
        Body: fileBuffer,
        ContentType: options.contentType || 'application/octet-stream',
        Metadata: options.metadata,
        ACL: options.acl,
      },
      // Configure multipart upload settings
      queueSize: 4, // Number of parts to upload concurrently
      partSize: 1024 * 1024 * 5, // 5MB per part
      leavePartsOnError: false, // Clean up failed uploads
    });

    // Optional: Add progress tracking
    upload.on('httpUploadProgress', (progress) => {
      console.log(`Upload progress: ${Math.round((progress.loaded! / progress.total!) * 100)}%`);
    });

    const result = await upload.done();

    return {
      success: true,
      key: options.key,
      location: result.Location,
      etag: result.ETag,
    };
  } catch (error) {
    console.error('Error uploading large file to S3:', error);
    return {
      success: false,
      key: options.key,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Upload a file stream to S3
 * @param fileStream - The file stream to upload
 * @param options - Upload options including bucket, key, contentType, etc.
 * @returns Promise<S3UploadResult> - Upload result with success status and details
 */
export async function uploadStreamToS3(
  fileStream: Readable,
  options: S3UploadOptions,
): Promise<S3UploadResult> {
  try {
    const client = getS3Client();
    const defaultBucket = getEnv('AWS_S3_BUCKET');

    const upload = new Upload({
      client,
      params: {
        Bucket: options.bucket || defaultBucket,
        Key: options.key,
        Body: fileStream,
        ContentType: options.contentType || 'application/octet-stream',
        Metadata: options.metadata,
        ACL: options.acl,
      },
    });

    const result = await upload.done();

    return {
      success: true,
      key: options.key,
      location: result.Location,
      etag: result.ETag,
    };
  } catch (error) {
    console.error('Error uploading stream to S3:', error);
    return {
      success: false,
      key: options.key,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Generate a unique file key with timestamp and optional prefix
 * @param originalName - Original filename
 * @param prefix - Optional prefix for the key
 * @returns string - Generated unique key
 */
export function generateS3Key(originalName: string, prefix?: string): string {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const extension = originalName.split('.').pop();
  const baseName = originalName.split('.').slice(0, -1).join('.');

  const key = `${baseName}-${timestamp}-${randomString}.${extension}`;

  return prefix ? `${prefix}/${key}` : key;
}

/**
 * Get the public URL for an S3 object
 * @param key - The S3 object key
 * @param bucket - Optional bucket name (uses default if not provided)
 * @returns string - Public URL for the S3 object
 */
export function getS3PublicUrl(key: string, bucket?: string): string {
  const defaultBucket = getEnv('AWS_S3_BUCKET');
  const bucketName = bucket || defaultBucket;
  const region = getEnv('AWS_REGION', 'us-east-1');

  return `https://${bucketName}.s3.${region}.amazonaws.com/${key}`;
}
