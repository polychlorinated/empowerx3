import { gqlFetch } from '../graphql';

export interface WPPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  featuredImage?: {
    node: { sourceUrl: string; altText: string; mediaDetails: { width: number; height: number } };
  };
  categories?: { nodes: Array<{ name: string }> };
  seo?: {
    title?: string;
    metaDesc?: string;
    opengraphTitle?: string;
    opengraphDescription?: string;
    opengraphImage?: { sourceUrl?: string };
  };
}

export async function getRecentPosts(count = 3): Promise<WPPost[]> {
  const data = await gqlFetch<{ posts: { nodes: WPPost[] } }>(
    /* GraphQL */ `
      query GetRecentPosts($count: Int!) {
        posts(first: $count, where: { orderby: { field: DATE, order: DESC } }) {
          nodes {
            slug
            title
            excerpt
            date
            featuredImage {
              node { sourceUrl altText mediaDetails { width height } }
            }
            categories { nodes { name } }
          }
        }
      }
    `,
    { count },
  );
  return data.posts.nodes;
}
