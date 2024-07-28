import { Tables, TablesInsert, TablesUpdate } from "./database.types";

export class Tag implements Tables<'tags'> {
  id: number;
  value: string;
  created_at: string;
}


export namespace Tag {
  export type Insert = TablesInsert<'tags'>;
  export type Update = TablesUpdate<'tags'>;
}
