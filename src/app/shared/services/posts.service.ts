import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { SupabaseService } from './supabase.service';
import { DateTime } from 'luxon';
import { QueryPostTags } from '../models/query-post-tags.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private supabaseService: SupabaseService) {
  }

  async getAllByTags(queryPostTags: QueryPostTags): Promise<Post[]> {
    let query = this.supabaseService.client
      .from('posts')
      .select('*, organizations!post_organizations(*), author:user_profiles(*), departments(*)');

    if (queryPostTags.departmentId) {
      query = query.eq('department_id', queryPostTags.departmentId);
    }

    if (queryPostTags.emitorStatus) {
      query = query.eq('emitor_status', queryPostTags.emitorStatus);
    }

    if (queryPostTags.lifecycle) {
      query = query.eq('lifecycle', queryPostTags.lifecycle);
    }

    if (queryPostTags.tags && queryPostTags.tags.length > 0) {
      query = query.contains('tags', queryPostTags.tags);
    }

    const response = await query
      .order('updated_at', {ascending: false})
      .limit(100);

    if (response.error) {
      throw new Error('Erreur lors de la récupération des posts', {cause: response.error});
    }

    return response.data;
  }

  async getAllByUserProfileId(id: number): Promise<Post[]> {
    const response = await this.supabaseService.client
      .from('posts')
      .select('*, organizations!post_organizations(*), author:user_profiles(*), departments(*)')
      .eq('user_profile_id', id)
      .order('updated_at', {ascending: false})
      .limit(100);

    if (response.error) {
      throw new Error('Erreur lors de la récupération des posts', {cause: response.error});
    }

    return response.data;
  }

  async getById(id: number): Promise<Post | null> {
    const response = await this.supabaseService.client
      .from('posts')
      .select('*, organizations!post_organizations(*), author:user_profiles(*), departments(*)')
      .eq('id', id)
      .maybeSingle();

    if (response.error) {
      throw new Error('Erreur lors de la récupération du post', {cause: response.error});
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
      throw new Error('Erreur lors de la création du post', {cause: response.error});
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
      throw new Error('Erreur lors de la mise à jour du post', {cause: response.error});
    }

    return response.data;
  }

  async delete(id: number): Promise<void> {
    const response = await this.supabaseService.client
      .from('posts')
      .delete()
      .eq('id', id);

    if (response.error) {
      throw new Error('Erreur lors de la suppression du post', {cause: response.error});
    }
  }
}
