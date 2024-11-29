import { User } from '@supabase/supabase-js';
import { isSuperAdmin } from '../common/is-super-admin.ts';
import { TablesInsert } from '../../_shared/database.types.ts';
import { createAuthUser } from '../common/create-auth-user.ts';
import { createUserProfile } from '../common/create-user-profile.ts';

type UserWithProfile = TablesInsert<'user_profiles'> & { user: User };

export async function createUser(requester: User, user: UserWithProfile): Promise<UserWithProfile> {
  await isSuperAdmin(requester.id);

  const authUser = await createAuthUser(user.user);

  user.user_id = authUser.id;

  const userProfile = await createUserProfile(user);

  return {
    ...userProfile,
    user: authUser,
  };
}
