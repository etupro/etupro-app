import { UserProfile } from '../models/user-profile.model';
import { SupabaseService } from './supabase.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private supabaseService: SupabaseService) {
  }

  async getUserProfileByIdWithAuthUser(id: number): Promise<UserProfile | null> {
    const {data, error} = await this.supabaseService.client.functions.invoke<UserProfile | null>(`users/${id}`, {
      method: 'GET'
    });

    if (error) {
      throw new Error('Erreur lors de la récupération de l\'utilisateur', {cause: error});
    }

    return data;
  }

  async updateUserProfileByIdWithAuthUser(id: number, userProfile: UserProfile.Update): Promise<UserProfile | null> {
    const {data, error} = await this.supabaseService.client.functions.invoke<UserProfile | null>(`users/${id}`, {
      method: 'PUT',
      body: userProfile
    });

    if (error) {
      throw new Error('Erreur lors de la modification de l\'utilisateur', {cause: error});
    }

    return data;
  }

  async insertUserProfileByIdWithAuthUser(userProfile: UserProfile.Insert): Promise<UserProfile | null> {
    const {data, error} = await this.supabaseService.client.functions.invoke<UserProfile | null>('users', {
      method: 'POST',
      body: userProfile
    });

    if (error) {
      throw new Error('Erreur lors de la modification de l\'utilisateur', {cause: error});
    }

    return data;
  }

}
