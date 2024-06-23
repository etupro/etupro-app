import { Injectable } from '@angular/core';
import { Tag } from "../models/tag.model";
import { SupabaseService } from "./supabase.service";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { DateTime } from "luxon";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private supabaseService: SupabaseService) {
  }

  async getById(id: number): Promise<PostgrestSingleResponse<Tag | null>> {
    return this.supabaseService.client
      .from('tags')
      .select('*')
      .eq('id', id)
      .maybeSingle()
  }

  async create(tag: Tag.Insert): Promise<PostgrestSingleResponse<null>> {
    return this.supabaseService.client
      .from('tags')
      .insert(tag)
  }

  async update(id: number, tag: Tag.Update): Promise<PostgrestSingleResponse<null>> {
    return this.supabaseService.client
      .from('tags')
      .update({
        ...tag,
        id,
        updated_at: DateTime.now().toISO()
      })
      .eq('id', id)
  }

  async getAll(): Promise<PostgrestSingleResponse<Tag[]>> {
    return this.supabaseService.client
      .from('tags')
      .select('*')
      .order('value', {ascending: true})
  }
}
