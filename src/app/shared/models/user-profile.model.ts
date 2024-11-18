import { Tables, TablesInsert, TablesUpdate } from './database.types';
import { User } from '@supabase/supabase-js';
import { Role } from './enum/role.enum';
import { Organization } from './organiazation.model';

export class UserProfile implements Tables<'user_profiles'> {
  id: number;
  user_id: string;
  display_name: string;
  role: Role;
  created_at: string;
  updated_at: string;

  user?: User;
  organisations?: Organization[];
}

export namespace UserProfile {
  export type Insert = TablesInsert<'user_profiles'> & { user?: Partial<User> };
  export type Update = TablesUpdate<'user_profiles'> & { user?: Partial<User> };
}
