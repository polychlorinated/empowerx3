import type { APIRoute } from 'astro';
import { env } from '@/lib/env';

const SESSION_COOKIE = 'x3_session';
const SESSION_VALUE = 'authenticated';

export const POST: APIRoute = async ({ request, cookies, redirect }) => {
  const formData = await request.formData();
  const password = formData.get('password') as string;
  const next = (formData.get('next') as string) || '/portal';

  if (!password) {
    return new Response('Password required', { status: 400 });
  }

  // Verify password against bcrypt hash
  // Note: You'll need to add bcrypt dependency: npm install bcrypt @types/bcrypt
  // const isValid = await bcrypt.compare(password, env.PORTAL_PASSWORD_HASH);
  
  // TEMPORARY: Simple comparison until bcrypt is added
  // REPLACE WITH BCRYPT IN PRODUCTION
  const isValid = password === import.meta.env.PORTAL_PASSWORD; // Set in .env for dev only

  if (!isValid) {
    return redirect(`/portal/login?error=invalid&next=${encodeURIComponent(next)}`, 302);
  }

  // Set secure session cookie
  cookies.set(SESSION_COOKIE, SESSION_VALUE, {
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  return redirect(next, 302);
};

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  // If already authenticated, redirect to portal
  const session = cookies.get(SESSION_COOKIE)?.value;
  if (session === SESSION_VALUE) {
    return redirect(url.searchParams.get('next') || '/portal', 302);
  }

  // Render login page (handled by login.astro)
  return new Response(null, { status: 200 });
};
