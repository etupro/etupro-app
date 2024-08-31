import { Tables, TablesInsert, TablesUpdate } from "./database.types";
import { UserProfile } from "./user-profile.model";

export class Post implements Tables<'posts'> {
  id: number;
  user_profile_id: number;
  title: string;
  content: string;
  cover: string | null;
  tags: string[];
  created_at: string;
  updated_at: string;

  user_profiles?: UserProfile | null;
}

export namespace Post {
  export type Insert = TablesInsert<'posts'>;
  export type Update = TablesUpdate<'posts'>;
}
