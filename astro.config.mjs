import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Static by default; individual routes opt in to SSR via `export const prerender = false`
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [tailwind(), sitemap()],
  image: {
    // sharp runs at build time only — correct for Cloudflare Pages where all marketing pages are prerendered
    domains: ['wp.empowerx3.com'],
  },
  vite: {
    ssr: {
      external: [
        'node:buffer', 
        'node:path', 
        'node:stream', 
        'node:util',
        'node:crypto'  // Added for login.astro
      ],
    },
  },
  site: 'https://empowerx3.com',
});
