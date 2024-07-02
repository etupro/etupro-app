import { Tables, TablesInsert, TablesUpdate } from "./database.types";

export class UserProfile implements Tables<'user_profiles'> {
  id: number;
  user_id: string;
  organization_id: number | null;
  display_name: string;
  created_at: string;
  updated_at: string;
}

export namespace UserProfile {
  export type Insert = TablesInsert<'user_profiles'>;
  export type Update = TablesUpdate<'user_profiles'>;
}
