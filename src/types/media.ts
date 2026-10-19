export interface MediaFileResponse {
  id: number;
  url: string;
  s3Key: string;
  originalName: string;
  contentType: string;
  sizeBytes: number;
}
