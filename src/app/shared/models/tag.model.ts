import { Tables, TablesInsert, TablesUpdate } from "./database.types";

export namespace Tag {
  export type Table = Tables<'tags'>;
  export type Insert = TablesInsert<'tags'>;
  export type Update = TablesUpdate<'tags'>;
}
