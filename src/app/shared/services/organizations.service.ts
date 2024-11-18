import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { DateTime } from 'luxon';
import { Organization } from '../models/organiazation.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService {

  constructor(private supabaseService: SupabaseService) {
  }

  async getAll(): Promise<Organization[]> {
    const response = await this.supabaseService.client
      .from('organizations')
      .select('*')
      .order('id', {ascending: true});

    if (response.error) {
      throw new Error('Erreur lors de la récupération de l\'organisation', {cause: response.error});
    }

    return response.data;
  }

  async getById(id: number): Promise<Organization | null> {
    const response = await this.supabaseService.client
      .from('organizations')
      .select('*, owner_profile:user_profiles(*), users:user_profiles!user_organizations(*)')
      .eq('id', id)
      .maybeSingle();

    if (response.error) {
      throw new Error('Erreur lors de la récupération de l\'organisation', {cause: response.error});
    }

    return response.data;
  }

  async create(Organization: Organization.Insert): Promise<Organization> {
    const response = await this.supabaseService.client
      .from('organizations')
      .insert(Organization)
      .select('*, owner_profile:user_profiles(*), users:user_profiles!user_organizations(*)')
      .single();

    if (response.error) {
      throw new Error('Erreur lors de la création de l\'organisation', {cause: response.error});
    }

    return response.data;
  }

  async update(id: number, Organization: Organization.Update): Promise<Organization | null> {
    const response = await this.supabaseService.client
      .from('organizations')
      .update({
        ...Organization,
        id,
        updated_at: DateTime.now().toISO()
      })
      .eq('id', id)
      .select('*, owner_profile:user_profiles(*), users:user_profiles!user_organizations(*)')
      .single();

    if (response.error) {
      throw new Error('Erreur lors de la mise à jour de l\'organisation', {cause: response.error});
    }

    return response.data;
  }
}
