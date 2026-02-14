// @ts-check
import { defineConfig } from 'astro/config';
import { remarkBaseImages } from './src/plugins/remarkBaseImages.mjs';

const base = '/website';

// https://astro.build/config
export default defineConfig({
  site: 'https://giridharvc7.github.io',
  base,
  output: 'static',
  markdown: {
    remarkPlugins: [
      [remarkBaseImages, base],
    ],
  },
});
