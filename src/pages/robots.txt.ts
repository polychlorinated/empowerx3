export async function GET({ site }) {
  const robots = `User-agent: *
Allow: /

Sitemap: ${site}sitemap-index.xml
`;

  return new Response(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}