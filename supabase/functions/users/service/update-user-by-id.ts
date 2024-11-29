import { User } from '@supabase/supabase-js';
import { isSuperAdmin } from '../common/is-super-admin.ts';
import { updateUserProfile } from '../common/update-user-profile.ts';
import { updateAuthUser } from '../common/update-auth-user.ts';
import { TablesUpdate } from '../../_shared/database.types.ts';

type UserWithProfile = TablesUpdate<'user_profiles'> & { user: Partial<User> };

export async function updateUserById(requester: User, id: number, user: UserWithProfile): Promise<UserWithProfile> {
  await isSuperAdmin(requester.id);

  const userProfile = await updateUserProfile(id, user);

  const authUser = await updateAuthUser(userProfile.user_id, user.user);

  return {
    ...userProfile,
    user: authUser,
  };
}
