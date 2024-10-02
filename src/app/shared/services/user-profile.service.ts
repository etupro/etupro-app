import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { DateTime } from 'luxon';
import { UserProfile } from '../models/user-profile.model';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private supabaseService: SupabaseService) {
  }

  async getById(id: number): Promise<UserProfile | null> {
    const response = await this.supabaseService.client
      .from('user_profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (response.error) {
      throw response.error;
    }

    return response.data;
  }

  async getByUserId(id: string): Promise<UserProfile | null> {
    const response = await this.supabaseService.client
      .from('user_profiles')
      .select('*')
      .eq('user_id', id)
      .single();

    if (response.error) {
      throw response.error;
    }

    return response.data;
  }

  async create(userProfile: UserProfile.Insert): Promise<UserProfile> {
    const response = await this.supabaseService.client
      .from('user_profiles')
      .insert(userProfile)
      .select('*')
      .single();

    if (response.error) {
      throw response.error;
    }

    return response.data;
  }

  async update(id: number, userProfile: UserProfile.Update): Promise<UserProfile> {
    const response = await this.supabaseService.client
      .from('user_profiles')
      .update({
        ...userProfile,
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
}
