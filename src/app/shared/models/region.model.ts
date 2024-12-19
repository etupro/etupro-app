import { Tables } from './database.types';

export class Region implements Tables<'regions'> {
  code: string;
  name: string;
  created_at: string;
  updated_at: string;
}
