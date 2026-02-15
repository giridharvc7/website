// @ts-check
import { defineConfig } from 'astro/config';
import { remarkBaseImages } from './src/plugins/remarkBaseImages.mjs';
import { remarkFlightWidget } from './src/plugins/remarkFlightWidget.mjs';

const base = '';

// https://astro.build/config
export default defineConfig({
  site: 'https://giridhar.vc',
  output: 'static',
  markdown: {
    remarkPlugins: [
      [remarkBaseImages, base],
      remarkFlightWidget,
    ],
  },
});
