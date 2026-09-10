import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'server',
  adapter: cloudflare({
    imageService: {
      build: 'compile',
      runtime: 'cloudflare-binding'
    },
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.startsWith('https://empowerx3.com/portal') &&
        !page.startsWith('https://empowerx3.com/api') &&
        !page.startsWith('https://empowerx3.com/thank-you'),
      serialize: (item) => {
        // Signal recency to search and AI engines
        item.lastmod = new Date();
        return item;
      },
    }),
  ],
  image: {
    domains: ['wp.empowerx3.com'],
  },
  vite: {
    ssr: {
      external: [
        'node:buffer', 
        'node:path', 
        'node:stream', 
        'node:util',
        'node:crypto'
      ],
    },
  },
  site: 'https://empowerx3.com',
});
