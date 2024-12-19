import { Tables } from './database.types';

export class Commune implements Tables<'communes'> {
  code: string;
  code_department: string;
  name: string;
  zip_code: string;
  created_at: string;
  updated_at: string;
}
