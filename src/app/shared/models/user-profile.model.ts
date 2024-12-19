import { Tables, TablesInsert, TablesUpdate } from './database.types';
import { User } from '@supabase/supabase-js';
import { Role } from './enum/role.enum';
import { Organization } from './organiazation.model';
import { StudentInformation } from './student-information';

export class UserProfile implements Tables<'user_profiles'> {
  id: number;
  user_id: string;
  student_information_id: number | null;
  display_name: string;
  role: Role;
  description: string | null;
  phone_number: string | null;
  picture_path: string | null;
  created_at: string;
  updated_at: string;

  user?: User;
  studentInformation?: StudentInformation | null;
  organizations?: Organization[];
}

export namespace UserProfile {
  export type Insert = TablesInsert<'user_profiles'> & { user?: Partial<User> };
  export type Update = TablesUpdate<'user_profiles'> & { user?: Partial<User> };
}
