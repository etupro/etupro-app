import { isSuperAdmin } from '../common/is-super-admin.ts';
import { getUserProfile } from '../common/get-user-profile.ts';
import { getAuthUser } from '../common/get-auth-user.ts';
import { User } from '@supabase/supabase-js';
import { Tables } from '../../_shared/database.types.ts';

type UserWithProfile = Tables<'user_profiles'> & { user: User };

export async function getUserById(requester: User, id: number): Promise<UserWithProfile> {
  await isSuperAdmin(requester.id);

  const userProfile = await getUserProfile(id);

  const authUser = await getAuthUser(userProfile.user_id);

  return {
    ...userProfile,
    user: authUser,
  };
}
