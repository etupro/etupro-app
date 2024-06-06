import { Tables, TablesInsert, TablesUpdate } from "./database.types";

export namespace UserProfile {
  export type Table = Tables<'user_profiles'>;
  export type Insert = TablesInsert<'user_profiles'>;
  export type Update = TablesUpdate<'user_profiles'>;
}
