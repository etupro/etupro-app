import { Tables, TablesInsert, TablesUpdate } from "./database.types";
import { UserProfile } from "./user-profile.model";

export namespace Comment {
  export type Table = Tables<'comments'>;
  export type Insert = TablesInsert<'comments'>;
  export type Update = TablesUpdate<'comments'>;
  export type TableWithUserProfile = Tables<'comments'> & { user_profiles: UserProfile.Table | null };
}
