import { Injectable } from '@angular/core';
import { Comment } from "../models/comment.model";
import { SupabaseService } from "./supabase.service";
import { DateTime } from "luxon";
import { PostgrestSingleResponse } from "@supabase/supabase-js";

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private supabaseService: SupabaseService) {
  }

  async getById(id: number): Promise<PostgrestSingleResponse<Comment | null>> {
    return this.supabaseService.client
      .from('comments')
      .select('*')
      .eq('id', id)
      .maybeSingle();
  }

  async create(comment: Comment.Insert): Promise<PostgrestSingleResponse<null>> {
    return this.supabaseService.client
      .from('comments')
      .insert(comment);
  }

  async update(id: number, comment: Comment.Update): Promise<PostgrestSingleResponse<null>> {
    return this.supabaseService.client
      .from('comments')
      .update({
        ...comment,
        id,
        updated_at: DateTime.now().toISO()
      })
      .eq('id', id);
  }

  async getAllFromPost(postId: number): Promise<PostgrestSingleResponse<Comment[]>> {
    return this.supabaseService.client
      .from('comments')
      .select('*, user_profiles(*)')
      .eq('post_id', postId)
      .order('updated_at', {ascending: false})
      .limit(1000);
  }

  async delete(id: number): Promise<PostgrestSingleResponse<null>> {
    return this.supabaseService.client
      .from('comments')
      .delete()
      .eq('id', id);
  }
}
