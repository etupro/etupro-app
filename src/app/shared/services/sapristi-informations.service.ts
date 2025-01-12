import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { SupabaseService } from './supabase.service';
import { SapristiInformation } from '../models/sapristi-information';

@Injectable({
  providedIn: 'root'
})
export class SapristiInformationsService {

  constructor(private supabaseService: SupabaseService) {
  }

  async create(sapristiInformation: SapristiInformation.Insert): Promise<SapristiInformation> {
    const response = await this.supabaseService.client
      .from('sapristi_informations')
      .insert(sapristiInformation)
      .select('*')
      .single();

    if (response.error) {
      throw new Error('Erreur lors de la création des information sapristi', {cause: response.error});
    }

    return response.data;
  }

  async update(id: number, sapristiInformation: SapristiInformation.Update): Promise<SapristiInformation> {
    const response = await this.supabaseService.client
      .from('sapristi_informations')
      .update({
        ...sapristiInformation,
        user_profile_id: id,
        updated_at: DateTime.now().toISO()
      })
      .eq('user_profile_id', id)
      .select('*')
      .single();

    if (response.error) {
      throw new Error('Erreur lors de la mise à jour des information sapristi', {cause: response.error});
    }

    return response.data;
  }
}
