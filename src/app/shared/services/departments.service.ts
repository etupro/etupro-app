import { Injectable } from '@angular/core';
import { SupabaseService } from './supabase.service';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root'
})
export class DepartmentsService {

  constructor(private supabaseService: SupabaseService) {
  }

  async getByCode(code: string): Promise<Department | null> {
    const response = await this.supabaseService.client
      .from('departments')
      .select('*')
      .eq('code', code)
      .maybeSingle();

    if (response.error) {
      throw new Error('Erreur lors de la récupération du département', {cause: response.error});
    }

    return response.data;
  }

  async getAll(): Promise<Department[]> {
    const response = await this.supabaseService.client
      .from('departments')
      .select('*')
      .order('code', {ascending: true});

    if (response.error) {
      throw new Error('Erreur lors de la récupération des départements', {cause: response.error});
    }

    return response.data;
  }
}
