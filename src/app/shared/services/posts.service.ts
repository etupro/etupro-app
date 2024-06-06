import { Injectable } from '@angular/core';
import { Post } from "../models/post.model";
import { SupabaseService } from "./supabase.service";
import { DateTime } from "luxon";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private supabaseService: SupabaseService) {
  }

  async getAllByTags(tags: string[] = []): Promise<PostgrestSingleResponse<Post.Table[]>> {
    return this.supabaseService.client
      .from('posts')
      .select('*')
      .contains('tags', tags)
      .order('updated_at', {ascending: false})
      .limit(100);
  }

  async getById(id: Post.Table['id']): Promise<PostgrestSingleResponse<Post.Table | null>> {
    return this.supabaseService.client
      .from('posts')
      .select('*')
      .eq('id', id)
      .maybeSingle()
  }

  async create(post: Post.Insert): Promise<PostgrestSingleResponse<null>> {
    return this.supabaseService.client
      .from('posts')
      .insert(post)
  }

  async update(id: number, post: Post.Update): Promise<PostgrestSingleResponse<null>> {
    return this.supabaseService.client
      .from('posts')
      .update({
        ...post,
        id,
        updated_at: DateTime.now().toISO()
      })
      .eq('id', id)
  }
}
