import { Injectable } from '@angular/core';
import { SupabaseService } from "./supabase.service";
import { DateTime } from "luxon";
import { Organization } from "../models/organiazation.model";

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor(private supabaseService: SupabaseService) {
  }

  async getById(id: number): Promise<Organization | null> {
    const result = await this.supabaseService.client
      .from('organizations')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    return result.data;
  }

  async create(Organization: Organization.Insert): Promise<Organization | null> {
    const result = await this.supabaseService.client
      .from('organizations')
      .insert(Organization)
      .select('*')
      .single();

    return result.data
  }

  async update(id: number, Organization: Organization.Update): Promise<Organization | null> {
    const result = await this.supabaseService.client
      .from('organizations')
      .update({
        ...Organization,
        id,
        updated_at: DateTime.now().toISO()
      })
      .eq('id', id)
      .select('*')
      .single();

    return result.data;
  }
}
