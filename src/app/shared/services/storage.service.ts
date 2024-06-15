import { Injectable } from '@angular/core';
import { SupabaseService } from "./supabase.service";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private supabaseService: SupabaseService) {
  }

  async uploadToBucket(bucketName: StorageService.BucketName, fileName: string, file: File): Promise<string> {
    const {data, error} = await this.supabaseService.client.storage.from(bucketName).upload(fileName, file)
    if (error) {
      throw new Error(error.message);
    } else {
      return data?.path;
    }
  }

  async downLoadFromBucket(bucketName: StorageService.BucketName, filePath: string): Promise<Blob> {
    const {data, error} = await this.supabaseService.client.storage.from(bucketName).download(filePath)
    if (data instanceof Blob) {
      return data;
    } else {
      throw new Error(error?.message ?? 'Une erreur est survenue lors du téléchargement de la photo');
    }
  }
}

export namespace StorageService {
  export enum BucketName {
    POST_COVERS = "post_covers"
  }
}
