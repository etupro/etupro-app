import { Tables, TablesInsert, TablesUpdate } from './database.types';
import { UserProfile } from './user-profile.model';
import { Department } from './department.model';

export class Post implements Tables<'posts'> {
  id: number;
  user_profile_id: number;
  title: string;
  content: string;
  cover: string | null;
  tags: string[];
  author_name: string | null;
  department_id: number | null;
  created_at: string;
  updated_at: string;

  user_profiles?: UserProfile | null;
  departments?: Department | null;
}

export namespace Post {
  export type Insert = TablesInsert<'posts'>;
  export type Update = TablesUpdate<'posts'>;
}
