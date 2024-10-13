import { Injectable } from '@angular/core';
import { Comment } from '../models/comment.model';
import { SupabaseService } from './supabase.service';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private supabaseService: SupabaseService) {
  }

  async getById(id: number): Promise<Comment | null> {
    const response = await this.supabaseService.client
      .from('comments')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (response.error) {
      throw new Error('Erreur lors de la récupération du commentaire', {cause: response.error});
    }

    return response.data;
  }

  async create(comment: Comment.Insert): Promise<Comment> {
    const response = await this.supabaseService.client
      .from('comments')
      .insert(comment)
      .select('*')
      .single();

    if (response.error) {
      throw new Error('Erreur lors de la création du commentaire', {cause: response.error});
    }

    return response.data;
  }

  async update(id: number, comment: Comment.Update): Promise<Comment> {
    const response = await this.supabaseService.client
      .from('comments')
      .update({
        ...comment,
        id,
        updated_at: DateTime.now().toISO()
      })
      .eq('id', id)
      .select('*')
      .single();

    if (response.error) {
      throw new Error('Erreur lors de la mise à jour du commentaire', {cause: response.error});
    }

    return response.data;
  }

  async getAllFromPost(postId: number): Promise<Comment[]> {
    const response = await this.supabaseService.client
      .from('comments')
      .select('*, user_profiles(*)')
      .eq('post_id', postId)
      .order('updated_at', {ascending: false})
      .limit(1000);

    if (response.error) {
      throw new Error('Erreur lors de la récupération des commentaires', {cause: response.error});
    }

    return response.data;
  }

  async delete(id: number): Promise<void> {
    const response = await this.supabaseService.client
      .from('comments')
      .delete()
      .eq('id', id);

    if (response.error) {
      throw new Error('Erreur lors de la suppression du commentaire', {cause: response.error});
    }
  }
}
