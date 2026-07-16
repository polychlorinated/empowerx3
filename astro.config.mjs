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
  integrations: [tailwind(), sitemap()],
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
