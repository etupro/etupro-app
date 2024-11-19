import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class UserOrganizationsService {

  constructor(private supabaseService: SupabaseService) {
  }

  async insert(userProfileId: number, organizationId: number): Promise<void> {
    const response = await this.supabaseService.client
      .from('user_organizations')
      .insert({
        user_profile_id: userProfileId,
        organization_id: organizationId,
      });

    if (response.error) {
      throw new Error('Erreur lors de l\'affiliation entre un utilisateur et l\'organisation', {cause: response.error});
    }
  }

  async update(userProfileId: number, organizationIds: number[]): Promise<void> {
    await this.supabaseService.client.from('user_organizations').delete().eq('user_profile_id', userProfileId);

    for (const organizationId of organizationIds) {
      await this.insert(userProfileId, organizationId);
    }
  }
}
