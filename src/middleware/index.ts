import { defineMiddleware } from 'astro:middleware';

const PORTAL_PREFIX = '/portal';
const LOGIN_PATH = '/portal/login';
const LOGOUT_PATH = '/portal/logout';
const SESSION_COOKIE = 'x3_session';
const SESSION_VALUE = 'authenticated'; // In production, use a signed JWT or secure token

export const onRequest = defineMiddleware(async ({ url, cookies, redirect, locals }, next) => {
  const path = url.pathname;

  // Only gate /portal/* routes
  if (!path.startsWith(PORTAL_PREFIX)) {
    return next();
  }

  // Always allow the login page through
  if (path === LOGIN_PATH) {
    return next();
  }

  // Handle logout — clear cookie and redirect
  if (path === LOGOUT_PATH) {
    cookies.delete(SESSION_COOKIE, { path: '/', secure: true, sameSite: 'lax' });
    return redirect(LOGIN_PATH, 302);
  }

  // Check session cookie
  const session = cookies.get(SESSION_COOKIE)?.value;
  
  // In production, verify against a proper session store or signed JWT
  // For now, check against expected value (set after successful login)
  if (!session || session !== SESSION_VALUE) {
    const loginUrl = new URL(LOGIN_PATH, url.origin);
    loginUrl.searchParams.set('next', path);
    return redirect(loginUrl.toString(), 302);
  }

  // Attach user info to locals for use in portal pages
  locals.user = { authenticated: true };
  
  return next();
});
