import { Tables } from '../../_shared/database.types.ts';
import { getServiceClient } from './service-client.ts';

export async function getUserProfile(id: number): Promise<Tables<'user_profiles'>> {
  const userProfileResponse = await getServiceClient()
    .from('user_profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (userProfileResponse.error) {
    console.error(userProfileResponse.error);
    throw new Error(userProfileResponse.error.message, {cause: userProfileResponse.error});
  }

  return userProfileResponse.data;
}
