import { getServiceClient } from './service-client.ts';
import { User } from 'jsr:@supabase/supabase-js@2';

export async function getUserFromToken(req: Request): Promise<User | null> {
  const authHeader = req.headers.get('Authorization')!;
  const token = authHeader.replace('Bearer ', '');
  const userResponse = await getServiceClient().auth.getUser(token);
  return userResponse.data.user;
}