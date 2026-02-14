import { visit } from 'unist-util-visit';

/**
 * Remark plugin: rewrites absolute image paths in both markdown ![]() syntax
 * and inline HTML <img> tags. Prepends the site base path so you can write
 * /images/blog/foo.jpg everywhere without hardcoding /website.
 *
 * When the site moves to a custom domain, set base to '' in astro.config.mjs.
 */
export function remarkBaseImages(base) {
  return function (tree) {
    if (!base) return;

    // Handle markdown image syntax: ![alt](src)
    visit(tree, 'image', (node) => {
      if (node.url.startsWith('/') && !node.url.startsWith(base)) {
        node.url = base + node.url;
      }
    });

    // Handle inline HTML <img src="..."> tags
    visit(tree, 'html', (node) => {
      node.value = node.value.replace(
        /(<img\b[^>]*\bsrc=")(\/)(?!\/)/g,
        `$1${base}/`
      );
    });
  };
}
