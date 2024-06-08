import { Tables, TablesInsert, TablesUpdate } from "./database.types";
import { UserProfile } from "./user-profile.model";

export namespace Post {
  export type Table = Tables<'posts'>;
  export type Insert = TablesInsert<'posts'>;
  export type Update = TablesUpdate<'posts'>;
  export type TableWithUserProfile = Tables<'posts'> & { user_profiles: UserProfile.Table | null };
}
