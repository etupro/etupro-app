import { Tables, TablesInsert, TablesUpdate } from "./database.types";
import { UserProfile } from "./user-profile.model";

export class Comment implements Tables<'comments'> {
  id: number;
  user_profile_id: number;
  content: string;
  post_id: number;
  created_at: string;
  updated_at: string;

  user_profiles?: UserProfile | null;
}

export namespace Comment {
  export type Insert = TablesInsert<'comments'>;
  export type Update = TablesUpdate<'comments'>;
}
