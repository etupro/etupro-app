import { User } from 'jsr:@supabase/supabase-js@2';
import { getServiceClient } from './service-client.ts';
import { randomUUID } from 'node:crypto';

export async function createAuthUser(user: User): Promise<User> {
  if (!user.email) {
    throw new Error('Email is required');
  }

  const userResponse = await getServiceClient().auth.signInWithPassword({
    email: user.email,
    password: randomUUID(),
  });

  if (userResponse.error) {
    console.error(userResponse.error);
    throw new Error(userResponse.error.message, {cause: userResponse.error});
  }

  return userResponse.data.user;
}
