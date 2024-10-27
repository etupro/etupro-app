import { Tables, TablesInsert, TablesUpdate } from './database.types';

export class Department implements Tables<'departments'> {
  id: number;
  number: string;
  name: string;
  region: string;
  updated_at: string;
  created_at: string;
}

export namespace Department {
  export type Insert = TablesInsert<'departments'>;
  export type Update = TablesUpdate<'departments'>;
}
