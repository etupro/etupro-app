import { Injectable } from '@angular/core';
import { SupabaseService } from "./supabase.service";
import { v4 as uuidv4 } from "uuid";

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private supabaseService: SupabaseService) {
  }

  async uploadToBucket(bucketName: StorageService.BucketName, file: File): Promise<string> {
    const fileExt = file.name.split('.').pop()
    const filePath = `${uuidv4()}.${fileExt}`
    const {data, error} = await this.supabaseService.client.storage.from(bucketName).upload(filePath, file)
    if (error) {
      throw new Error(error.message);
    } else {
      return data?.path;
    }
  }

  getPublicUrl(bucketName: StorageService.BucketName, filePath: string): string {
    return this.supabaseService.client.storage.from(bucketName).getPublicUrl(filePath).data.publicUrl;
  }
}

export namespace StorageService {
  export enum BucketName {
    POST_COVERS = "post_covers"
  }
}
