function getEnv(key: string, required = true): string {
  const value = import.meta.env[key];
  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value || '';
}

export const env = {
  WP_GRAPHQL_ENDPOINT: getEnv('WPGRAPHQL_ENDPOINT'),
  WP_GRAPHQL_AUTH_TOKEN: getEnv('WP_GRAPHQL_AUTH_TOKEN', false),
  SITE_URL: getEnv('SITE_URL'),
  PREVIEW_SECRET: getEnv('PREVIEW_SECRET', false),
  PORTAL_PASSWORD_HASH: getEnv('PORTAL_PASSWORD_HASH', false),
  DEPLOY_HOOK_SECRET: getEnv('DEPLOY_HOOK_SECRET', false),
} as const;

export type Env = typeof env;
