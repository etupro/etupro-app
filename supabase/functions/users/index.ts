import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { getUserById } from './service/get-user-by-id.ts';
import { getUserFromToken } from './common/user-token.ts';
import { updateUserById } from './service/update-user-by-id.ts';
import { createUser } from './service/create-user.ts';

const edgeHeaders = {
  ...corsHeaders,
  'Content-Type': 'application/json',
};

//TODO clean this. Find a clean way to inject of create properly the client and to handle routing.
// If someone is passing by, don't look at this code, it's a mess.

Deno.serve(async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const method = req.method;
  console.log(`[${method}] ${url.pathname}`);

  try {
    if (req.method === 'OPTIONS') {
      return new Response('ok', {headers: edgeHeaders});
    }

    const requester = await getUserFromToken(req);
    if (!requester) {
      return new Response(JSON.stringify({message: 'Unauthorized'}), {
        headers: edgeHeaders,
        status: 401,
      });
    }

    const lastPathPart = url.pathname.split('/').pop();
    if (!lastPathPart) {
      return new Response(JSON.stringify({message: 'Not found'}), {
        headers: edgeHeaders,
        status: 404,
      });
    }

    if (lastPathPart === 'users') {
      if (method === 'POST') {
        const userProfile = await req.json();
        const response = await createUser(requester, userProfile);

        return new Response(JSON.stringify(response), {
          headers: edgeHeaders,
          status: 200,
        });
      }
    } else {
      const id = parseInt(lastPathPart);

      if (method === 'GET') {
        const response = await getUserById(requester, id);

        return new Response(JSON.stringify(response), {
          headers: edgeHeaders,
          status: 200,
        });
      }

      if (method === 'PUT') {
        const userProfile = await req.json();
        const response = await updateUserById(requester, id, userProfile);

        return new Response(JSON.stringify(response), {
          headers: edgeHeaders,
          status: 200,
        });
      }
    }

    return new Response(JSON.stringify({message: 'method not implemented'}), {
      headers: edgeHeaders,
      status: 501,
    });
  } catch (error: any) {
    console.error(`[${method}] ${url.pathname} : `, error.message);
    return new Response(JSON.stringify(error), {
      headers: edgeHeaders,
      status: 500,
    });
  }
});
