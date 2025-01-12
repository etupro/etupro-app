import { Tables, TablesInsert, TablesUpdate } from './database.types';

export class SapristiInformation implements Tables<'sapristi_informations'> {
  user_profile_id: number;
  external_activity: number;
  cleaning_help: boolean;
  banned_places: string;
  banned_illnesses: string;
  created_at: string;
  updated_at: string;

}

export namespace SapristiInformation {
  export type Insert = TablesInsert<'sapristi_informations'>;
  export type Update = TablesUpdate<'sapristi_informations'>;
}
