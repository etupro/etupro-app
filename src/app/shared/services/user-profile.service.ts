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

  async getAll(): Promise<UserProfile[]> {
    const response = await this.supabaseService.client
      .from('user_profiles')
      .select('*, organizations!user_organizations(*)');

    if (response.error) {
      throw new Error('Erreur lors de la récupération des profils utilisateurs', {cause: response.error});
    }

    return response.data;
  }

  async getById(id: number): Promise<UserProfile | null> {
    const response = await this.supabaseService.client
      .from('user_profiles')
      .select('*, organizations!user_organizations(*)')
      .eq('id', id)
      .single();

    if (response.error) {
      throw new Error('Erreur lors de la récupération du profil utilisateur', {cause: response.error});
    }

    return response.data;
  }

  async getByUserId(id: string): Promise<UserProfile | null> {
    const response = await this.supabaseService.client
      .from('user_profiles')
      .select('*, organizations!user_organizations(*), studentInformation:student_informations(*), sapristiInformation:sapristi_informations(*)')
      .eq('user_id', id)
      .single();

    if (response.error) {
      throw new Error('Erreur lors de la récupération du profil utilisateur', {cause: response.error});
    }

    return response.data;
  }

  async create(userProfile: UserProfile.Insert): Promise<UserProfile> {
    const response = await this.supabaseService.client
      .from('user_profiles')
      .insert(userProfile)
      .select('*, organizations!user_organizations(*), studentInformation:student_informations(*), sapristiInformation:sapristi_informations(*)')
      .single();

    if (response.error) {
      throw new Error('Erreur lors de la création du profil utilisateur', {cause: response.error});
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
      .select('*, organizations!user_organizations(*), studentInformation:student_informations(*), sapristiInformation:sapristi_informations(*)')
      .single();

    if (response.error) {
      throw new Error('Erreur lors de la mise à jour du profil utilisateur', {cause: response.error});
    }

    return response.data;
  }

}
