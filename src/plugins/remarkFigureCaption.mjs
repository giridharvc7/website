import { visit, SKIP } from 'unist-util-visit';

/**
 * Remark plugin: converts markdown images with a title into <figure><figcaption>.
 *
 * Usage in markdown:
 *   ![Alt text](/images/blog/foo.jpg "This becomes the caption")
 *
 * Images without a title are left as-is.
 * Run this AFTER remarkBaseImages so URLs are already resolved.
 */
export function remarkFigureCaption() {
  return function (tree) {
    visit(tree, 'image', (node, index, parent) => {
      if (!node.title || index === undefined || !parent) return;

      const alt = (node.alt || '').replace(/"/g, '&quot;');
      const caption = node.title
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      parent.children[index] = {
        type: 'html',
        value: `<figure>\n<img src="${node.url}" alt="${alt}" />\n<figcaption>${caption}</figcaption>\n</figure>`,
      };

      return SKIP;
    });
  };
}
