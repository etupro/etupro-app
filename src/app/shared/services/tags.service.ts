import { Injectable } from '@angular/core';
import { Tag } from '../models/tag.model';
import { SupabaseService } from './supabase.service';
import { DateTime } from 'luxon';

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor(private supabaseService: SupabaseService) {
  }

  async getById(id: number): Promise<Tag | null> {
    const response = await this.supabaseService.client
      .from('tags')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (response.error) {
      throw new Error('Erreur lors de la récupération du tag', {cause: response.error});
    }

    return response.data;
  }

  async create(tag: Tag.Insert): Promise<Tag> {
    const response = await this.supabaseService.client
      .from('tags')
      .insert(tag)
      .select('*')
      .single();

    if (response.error) {
      throw new Error('Erreur lors de la création du tag', {cause: response.error});
    }

    return response.data;
  }

  async update(id: number, tag: Tag.Update): Promise<Tag> {
    const response = await this.supabaseService.client
      .from('tags')
      .update({
        ...tag,
        id,
        updated_at: DateTime.now().toISO()
      })
      .eq('id', id)
      .select('*')
      .single();

    if (response.error) {
      throw new Error('Erreur lors de la mise à jour du tag', {cause: response.error});
    }

    return response.data;
  }

  async getAll(): Promise<Tag[]> {
    const response = await this.supabaseService.client
      .from('tags')
      .select('*')
      .order('value', {ascending: true});

    if (response.error) {
      throw new Error('Erreur lors de la récupération des tags', {cause: response.error});
    }

    return response.data;
  }
}
