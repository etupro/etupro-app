import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { v4 as uuidv4 } from 'uuid';
import { Map } from 'immutable';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private supabaseService: SupabaseService) {
  }

  async uploadToBucket(bucketName: StorageService.BucketName, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop();
    const filePath = `${uuidv4()}.${fileExt}`;
    console.log('bucketName: ', bucketName);
    console.log('filePath: ', filePath);
    const tokenResponse = await this.supabaseService.client.storage.from(bucketName).createSignedUploadUrl(filePath);
    console.log('tokenResponse: ', tokenResponse);

    let path: string | undefined;
    if (tokenResponse.data?.token) {
      const uploadResponse = await this.supabaseService.client.storage.from(bucketName).uploadToSignedUrl(filePath, tokenResponse.data.token, file);
      console.log('uploadResponse: ', uploadResponse);
      console.log(JSON.stringify((uploadResponse)));
      if (uploadResponse.error) {
        throw new Error(uploadResponse.error.message);
      }
      path = uploadResponse.data?.path;
    }

    if (!path) {
      throw new Error("Erreur while uploading image");
    }

    return path;
  }

  async getSignedUrl(bucketName: StorageService.BucketName, filePath: string): Promise<string | undefined> {
    const signedUrlResponse = await this.supabaseService.client.storage.from(bucketName).createSignedUrl(filePath, 300);
    return signedUrlResponse.data?.signedUrl;
  }

  async getSignedUrls(bucketName: StorageService.BucketName, filePath: string[]): Promise<Map<string, string>> {
    const signedUrlResponse = await this.supabaseService.client.storage.from(bucketName).createSignedUrls(filePath, 300);
    const signedUrlArray = signedUrlResponse.data ?? [];
    return signedUrlArray.reduce((map, data) => {
      if (data.path) {
        return map.set(data.path, data.signedUrl);
      } else {
        return map;
      }
    }, Map<string, string>());
  }
}

export namespace StorageService {
  export enum BucketName {
    POST_COVERS = "post_covers",
    ORGANIZATION_IMAGES = "organization_images"
  }
}
