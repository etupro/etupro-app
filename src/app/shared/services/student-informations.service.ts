import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { StudentInformation } from '../models/student-information';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root'
})
export class StudentInformationsService {

  constructor(private supabaseService: SupabaseService) {
  }

  async create(studentInformation: StudentInformation.Insert): Promise<StudentInformation> {
    const response = await this.supabaseService.client
      .from('student_informations')
      .insert(studentInformation)
      .select('*')
      .single();

    if (response.error) {
      throw new Error('Erreur lors de la création des information étudiantes', {cause: response.error});
    }

    return response.data;
  }

  async update(id: number, studentInformation: StudentInformation.Update): Promise<StudentInformation> {
    const response = await this.supabaseService.client
      .from('student_informations')
      .update({
        ...studentInformation,
        id,
        updated_at: DateTime.now().toISO()
      })
      .eq('id', id)
      .select('*')
      .single();

    if (response.error) {
      throw new Error('Erreur lors de la mise à jour des information étudiantes', {cause: response.error});
    }

    return response.data;
  }
}
