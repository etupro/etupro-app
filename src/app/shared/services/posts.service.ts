import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { SupabaseService } from './supabase.service';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private supabaseService: SupabaseService) {
  }

  async getAllByTags(tags: string[] = []): Promise<Post[]> {
    const response = await this.supabaseService.client
      .from('posts')
      .select('*, user_profiles(*)')
      .contains('tags', tags)
      .order('updated_at', {ascending: false})
      .limit(100);

    if (response.error) {
      throw response.error;
    }

    return response.data;
  }

  async getAllByUserProfileId(id: number): Promise<Post[]> {
    const response = await this.supabaseService.client
      .from('posts')
      .select('*, user_profiles(*)')
      .eq('user_profile_id', id)
      .order('updated_at', {ascending: false})
      .limit(100);

    if (response.error) {
      throw response.error;
    }

    return response.data;
  }

  async getById(id: number): Promise<Post | null> {
    const response = await this.supabaseService.client
      .from('posts')
      .select('*, user_profiles(*)')
      .eq('id', id)
      .maybeSingle();

    if (response.error) {
      throw response.error;
    }

    return response.data;
  }

  async create(post: Post.Insert): Promise<Post> {
    const response = await this.supabaseService.client
      .from('posts')
      .insert(post)
      .select('*')
      .single();

    if (response.error) {
      throw response.error;
    }

    return response.data;
  }

  async update(id: number, post: Post.Update): Promise<Post> {
    const response = await this.supabaseService.client
      .from('posts')
      .update({
        ...post,
        id,
        updated_at: DateTime.now().toISO()
      })
      .eq('id', id)
      .select('*')
      .single();

    if (response.error) {
      throw response.error;
    }

    return response.data;
  }

  async delete(id: number): Promise<void> {
    const response = await this.supabaseService.client
      .from('posts')
      .delete()
      .eq('id', id);

    if (response.error) {
      throw response.error;
    }
  }
}
