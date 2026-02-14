import { visit } from 'unist-util-visit';

/**
 * Remark plugin that prepends the site base path to absolute image paths
 * in markdown. This ensures images resolve correctly under a subdirectory
 * (e.g. /website) without hardcoding the path in every markdown file.
 *
 * When the site moves to a custom domain, just remove `base` from
 * astro.config.mjs and this plugin receives an empty string — no markdown changes needed.
 */
export function remarkBaseImages(base) {
  return function (tree) {
    if (!base) return;
    visit(tree, 'image', (node) => {
      if (node.url.startsWith('/') && !node.url.startsWith(base)) {
        node.url = base + node.url;
      }
    });
  };
}
