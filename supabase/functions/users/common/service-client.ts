import { createClient, SupabaseClient } from 'jsr:@supabase/supabase-js@2';
import { Database } from '../../_shared/database.types.ts';

let serviceClient: SupabaseClient<Database> | null = null;

export function getServiceClient(): SupabaseClient<Database> {
  if (!serviceClient) {
    serviceClient = createClient<Database>(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );
  }

  return serviceClient;
}
