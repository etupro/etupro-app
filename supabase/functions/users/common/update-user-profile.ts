import { Tables, TablesUpdate } from '../../_shared/database.types.ts';
import { getServiceClient } from './service-client.ts';
import { DateTime } from 'npm:luxon@3';

export async function updateUserProfile(id: number, userProfile: TablesUpdate<'user_profiles'>): Promise<Tables<'user_profiles'>> {
  const response = await getServiceClient()
    .from('user_profiles')
    .update({
      ...userProfile,
      id,
      user: undefined,
      updated_at: DateTime.now().toISO()
    })
    .eq('id', id)
    .select('*')
    .single();

  if (response.error) {
    throw new Error('Erreur lors de la mise à jour du profil utilisateur', {cause: response.error});
  }

  return response.data;
}
