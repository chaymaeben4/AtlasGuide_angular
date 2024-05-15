import { Injectable } from '@angular/core';
import {
  S3,
  S3ClientConfig,
  PutObjectCommandOutput,
  PutObjectCommand
} from "@aws-sdk/client-s3";
import {environnment} from "../../environnment/environnment";

@Injectable({
  providedIn: 'root'
})
export class AwsSdkService {
  public s3Client: S3;

  constructor() {
    const s3Config: S3ClientConfig = {
      forcePathStyle: false,
      endpoint: 'https://pfsfiles.sfo3.digitaloceanspaces.com',
      region: 'us-east-1',
      credentials: {
        accessKeyId: environnment.spacesKey,
        secretAccessKey: environnment.spacesSecret
      }
    };
    this.s3Client = new S3(s3Config);
  }

  uploadFile(file: File, bucket: string, key: string): Promise<PutObjectCommandOutput> {
    const params = {
      Bucket: bucket,
      Key: key,
      Body: file
    };

    return this.s3Client.send(new PutObjectCommand(params));
  }
}
