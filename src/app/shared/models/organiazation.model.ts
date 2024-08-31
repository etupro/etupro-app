import { Tables, TablesInsert, TablesUpdate } from "./database.types";

export class Organization implements Tables<'organizations'> {
  id: number;
  name: string;
  picture: string | null;
  created_at: string;
  updated_at: string;
}

export namespace Organization {
  export type Insert = TablesInsert<'organizations'>;
  export type Update = TablesUpdate<'organizations'>;
}
