import { Tables, TablesInsert } from '../../_shared/database.types.ts';
import { getServiceClient } from './service-client.ts';

export async function createUserProfile(userProfile: TablesInsert<'user_profiles'>): Promise<Tables<'user_profiles'>> {
  const response = await getServiceClient()
    .from('user_profiles')
    .insert(userProfile)
    .select('*')
    .single();

  if (response.error) {
    throw new Error('Erreur lors de la création du profil utilisateur', {cause: response.error});
  }

  return response.data;
}
