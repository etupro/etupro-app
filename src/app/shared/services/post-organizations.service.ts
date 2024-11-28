import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class PostOrganizationsService {

  constructor(private supabaseService: SupabaseService) {
  }

  async insert(postId: number, organizationId: number): Promise<void> {
    const response = await this.supabaseService.client
      .from('post_organizations')
      .insert({
        post_id: postId,
        organization_id: organizationId,
      });

    if (response.error) {
      throw new Error('Erreur lors de l\'affiliation entre un post et l\'organisation', {cause: response.error});
    }
  }

  async update(postId: number, organizationIds: number[]): Promise<void> {
    await this.supabaseService.client.from('post_organizations').delete().eq('post_id', postId);

    for (const organizationId of organizationIds) {
      await this.insert(postId, organizationId);
    }
  }
}
