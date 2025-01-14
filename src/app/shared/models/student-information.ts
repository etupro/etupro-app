import { Tables, TablesInsert, TablesUpdate } from './database.types';

export class StudentInformation implements Tables<'student_informations'> {
  user_profile_id: number;
  study_institute: string;
  study_label: string;
  study_level: string;
  skills: string[];
  created_at: string;
  updated_at: string;
}

export namespace StudentInformation {
  export type Insert = TablesInsert<'student_informations'>;
  export type Update = TablesUpdate<'student_informations'>;
}
