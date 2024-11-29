import { User } from '@supabase/supabase-js';
import { getServiceClient } from './service-client.ts';

export async function getAuthUser(id: string): Promise<User> {
  const userResponse = await getServiceClient().auth.admin.getUserById(id);

  if (userResponse.error) {
    console.error(userResponse.error);
    throw new Error(userResponse.error.message, {cause: userResponse.error});
  }

  return userResponse.data.user;
}
