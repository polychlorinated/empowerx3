const ENDPOINT = import.meta.env.WPGRAPHQL_ENDPOINT ?? 'https://wp.empowerx3.com/graphql';

export class GraphQLError extends Error {
  constructor(public errors: Array<{ message: string }>) {
    super(errors.map((e) => e.message).join('; '));
    this.name = 'GraphQLError';
  }
}

export async function gqlFetch<T = unknown>(
  query: string,
  variables?: Record<string, unknown>,
  options?: RequestInit,
): Promise<T> {
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    // SSG pages cache at build time; SSR pages fetch fresh
    ...options,
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`WPGraphQL HTTP ${res.status}: ${res.statusText}`);
  }

  const json = (await res.json()) as { data?: T; errors?: Array<{ message: string }> };

  if (json.errors?.length) {
    throw new GraphQLError(json.errors);
  }

  return json.data as T;
}
