import { Tables, TablesInsert, TablesUpdate } from './database.types';
import { UserProfile } from './user-profile.model';

export class Organization implements Tables<'organizations'> {
  id: number;
  name: string;
  picture: string | null;
  owner: number | null;
  created_at: string;
  updated_at: string;

  owner_profile?: UserProfile | null;
  users?: UserProfile[];
}

export namespace Organization {
  export type Insert = TablesInsert<'organizations'>;
  export type Update = TablesUpdate<'organizations'>;
}
