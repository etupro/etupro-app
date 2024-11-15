import { getServiceClient } from './service-client.ts';

export async function isSuperAdmin(id: string): Promise<boolean> {
  const userProfileResponse = await getServiceClient()
    .from('user_profiles')
    .select('*')
    .eq('user_id', id)
    .maybeSingle();

  if (userProfileResponse.error) {
    console.error(userProfileResponse.error);
    throw new Error(userProfileResponse.error.message, {cause: userProfileResponse.error});
  }

  const userProfile = userProfileResponse.data;

  const role = userProfile?.role;

  if (!role || role !== 'SUPER_ADMIN') {
    throw new Error('Requester is has no right to perform this action');
  }

  return true;
}
