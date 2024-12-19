import { Tables } from './database.types';

export class Department implements Tables<'departments'> {
  code: string;
  code_region: string | null;
  name: string;
  updated_at: string;
  created_at: string;
}
