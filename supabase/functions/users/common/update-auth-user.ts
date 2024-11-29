import { User } from '@supabase/supabase-js';
import { getServiceClient } from './service-client.ts';

export async function updateAuthUser(id: string, user: Partial<User>): Promise<User> {
  const userResponse = await getServiceClient().auth.admin.updateUserById(id, {
    email: user?.email,
  });

  if (userResponse.error) {
    console.error(userResponse.error);
    throw new Error(userResponse.error.message, {cause: userResponse.error});
  }

  return userResponse.data.user;
}
