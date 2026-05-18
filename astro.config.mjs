import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://kaalsarpdoshpujaujjain.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'always', // PERF: inline all CSS to eliminate render-blocking request (saves ~670ms)
    assets: '_astro'
  },
  compressHTML: true,
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover'
  },
  integrations: [
    mdx(),
    tailwind({ applyBaseStyles: false }),
    icon()
  ],
  image: {
    domains: ['kaalsarpdoshpujaujjain.com'],
    service: { entrypoint: 'astro/assets/services/sharp' }
  },
  vite: {
    build: {
      cssMinify: true,
      assetsInlineLimit: 4096
    }
  }
});
