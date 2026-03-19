import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.dslr.fr',
  trailingSlash: 'always',
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
  output: 'static',
  compressHTML: true,
  devToolbar: {
    enabled: false,
  },
  image: {
    domains: ['backoffice.dslr.fr'],
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
