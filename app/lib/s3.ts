import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createS3Client, getBucketConfig } from "./aws-config";

const s3Client = createS3Client();
const { bucketName, folderPrefix } = getBucketConfig();

/**
 * Upload a file to S3
 * @param buffer File buffer
 * @param fileName Original filename
 * @param isPublic Whether file should be publicly accessible
 * @returns S3 key (cloud_storage_path)
 */
export async function uploadFile(
  buffer: Buffer,
  fileName: string,
  isPublic: boolean = false
): Promise<string> {
  const timestamp = Date.now();
  const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  
  // Generate S3 key based on public/private access
  const cloud_storage_path = isPublic
    ? `${folderPrefix}public/uploads/${timestamp}-${sanitizedFileName}`
    : `${folderPrefix}uploads/${timestamp}-${sanitizedFileName}`;

  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: cloud_storage_path,
    Body: buffer,
    ContentType: getContentType(fileName),
  });

  await s3Client.send(command);
  return cloud_storage_path;
}

/**
 * Get file URL (public or signed)
 * @param cloud_storage_path S3 key
 * @param isPublic Whether file is publicly accessible
 * @returns URL to access the file
 */
export async function getFileUrl(
  cloud_storage_path: string,
  isPublic: boolean = false
): Promise<string> {
  if (isPublic) {
    // For public files, return direct S3 URL
    const region = process.env.AWS_REGION || 'us-east-1';
    return `https://${bucketName}.s3.${region}.amazonaws.com/${cloud_storage_path}`;
  } else {
    // For private files, generate signed URL with 1 hour expiry
    const command = new GetObjectCommand({
      Bucket: bucketName,
      Key: cloud_storage_path,
    });
    return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
  }
}

/**
 * Delete a file from S3
 * @param cloud_storage_path S3 key
 */
export async function deleteFile(cloud_storage_path: string): Promise<void> {
  const command = new DeleteObjectCommand({
    Bucket: bucketName,
    Key: cloud_storage_path,
  });
  await s3Client.send(command);
}

/**
 * Get content type based on file extension
 */
function getContentType(fileName: string): string {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const contentTypes: Record<string, string> = {
    pdf: 'application/pdf',
    doc: 'application/msword',
    docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    txt: 'text/plain',
  };
  return contentTypes[ext || ''] || 'application/octet-stream';
}
