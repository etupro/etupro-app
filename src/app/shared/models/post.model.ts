import { Tables, TablesInsert, TablesUpdate } from "./database.types";

export namespace Post {
  export type Table = Tables<'posts'>;
  export type Insert = TablesInsert<'posts'>;
  export type Update = TablesUpdate<'posts'>;
}
