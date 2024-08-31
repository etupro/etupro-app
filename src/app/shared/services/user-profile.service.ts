import { Injectable } from '@angular/core';
import { SupabaseService } from "./supabase.service";
import { PostgrestSingleResponse } from "@supabase/supabase-js";
import { DateTime } from "luxon";
import { UserProfile } from "../models/user-profile.model";

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {

  constructor(private supabaseService: SupabaseService) {
  }

  async getByUserId(id: string): Promise<PostgrestSingleResponse<UserProfile | null>> {
    return this.supabaseService.client
      .from('user_profiles')
      .select('*')
      .eq('user_id', id)
      .maybeSingle();
  }

  async create(userProfile: UserProfile.Insert): Promise<PostgrestSingleResponse<null>> {
    return this.supabaseService.client
      .from('user_profiles')
      .insert(userProfile);
  }

  async update(id: number, userProfile: UserProfile.Update): Promise<PostgrestSingleResponse<null>> {
    return this.supabaseService.client
      .from('user_profiles')
      .update({
        ...userProfile,
        id,
        updated_at: DateTime.now().toISO()
      })
      .eq('id', id);
  }
}
