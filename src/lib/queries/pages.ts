import { gqlFetch } from '../graphql';

export interface WPPage {
  title: string;
  content: string;
  seo?: {
    title?: string;
    metaDesc?: string;
    opengraphTitle?: string;
    opengraphDescription?: string;
    opengraphImage?: { sourceUrl?: string };
  };
}

const PAGE_FIELDS = /* GraphQL */ `
  fragment PageFields on Page {
    title
    content
    seo {
      title
      metaDesc
      opengraphTitle
      opengraphDescription
      opengraphImage { sourceUrl }
    }
  }
`;

export async function getPageBySlug(slug: string): Promise<WPPage | null> {
  const data = await gqlFetch<{ page: WPPage | null }>(
    /* GraphQL */ `
      query GetPage($slug: ID!) {
        page(id: $slug, idType: URI) {
          ...PageFields
        }
      }
      ${PAGE_FIELDS}
    `,
    { slug },
  );
  return data.page;
}
