import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { Database } from '../models/database.types';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  client: SupabaseClient<Database, 'public', Database[Extract<keyof Database, "public">]>;

  constructor() {
    this.client = createClient<Database>(environment.supabase.url, environment.supabase.key, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
  }


}
