import { defineMiddleware } from 'astro:middleware';

const PORTAL_PREFIX = '/portal';
const LOGIN_PATH = '/portal/login';
const LOGOUT_PATH = '/portal/logout';
const SESSION_COOKIE = 'x3_session';

export const onRequest = defineMiddleware(async ({ url, cookies, redirect }, next) => {
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
    cookies.delete(SESSION_COOKIE, { path: '/' });
    return redirect(LOGIN_PATH, 302);
  }

  // Check session cookie
  const session = cookies.get(SESSION_COOKIE)?.value;
  if (!session || session !== 'authenticated') {
    return redirect(`${LOGIN_PATH}?next=${encodeURIComponent(path)}`, 302);
  }

  return next();
});
