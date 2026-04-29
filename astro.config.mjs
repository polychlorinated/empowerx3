import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  // Static by default; individual routes opt in to SSR via `export const prerender = false`
  output: 'static',
  adapter: cloudflare({
    imageService: 'compile',
    platformProxy: {
      enabled: true,
    },
  }),
  integrations: [tailwind()],
  image: {
    // sharp runs at build time only — correct for Cloudflare Pages where all marketing pages are prerendered

    domains: ['wp.empowerx3.com'],
  },
  vite: {
    ssr: {
      external: ['node:buffer', 'node:path', 'node:stream', 'node:util'],
    },
  },
});
