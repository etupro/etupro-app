import { Tables, TablesInsert, TablesUpdate } from './database.types';

export class StudentInformations implements Tables<'student_informations'> {
  user_id: number;
  description: string | null;
  phone_number: string | null;
  picture_path: string | null;
  skills: string[];
  study_institute: string;
  study_label: string;
  study_level: string;
  created_at: string;

}

export namespace StudentInformations {
  export type Insert = TablesInsert<'student_informations'>;
  export type Update = TablesUpdate<'student_informations'>;
}
