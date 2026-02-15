// @ts-check
import { defineConfig } from 'astro/config';
import { remarkBaseImages } from './src/plugins/remarkBaseImages.mjs';
import { remarkFigureCaption } from './src/plugins/remarkFigureCaption.mjs';
import { remarkFlightWidget } from './src/plugins/remarkFlightWidget.mjs';

const base = '';

// https://astro.build/config
export default defineConfig({
  site: 'https://giridhar.vc',
  output: 'static',
  markdown: {
    remarkPlugins: [
      [remarkBaseImages, base],
      remarkFigureCaption,
      remarkFlightWidget,
    ],
  },
});
