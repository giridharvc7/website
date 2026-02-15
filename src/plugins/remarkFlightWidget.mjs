import { visit } from 'unist-util-visit';

/**
 * Remark plugin: replaces `::flight` in markdown with a flight info card.
 * Reads flight data from the post's YAML frontmatter (`flight` field).
 *
 * Usage in markdown: just write `::flight` on its own line.
 */
export function remarkFlightWidget() {
  return function (tree, file) {
    const frontmatter = file.data.astro?.frontmatter;
    if (!frontmatter?.flight) return;

    visit(tree, 'paragraph', (node, index, parent) => {
      if (
        node.children.length === 1 &&
        node.children[0].type === 'text' &&
        node.children[0].value.trim() === '::flight'
      ) {
        const html = buildFlightHtml(frontmatter.flight);
        parent.children[index] = { type: 'html', value: html };
      }
    });
  };
}

function buildFlightHtml(flight) {
  const { from, to, airline, airlineCode, departure, arrival, duration, stops = [] } = flight;

  const date = new Date(flight.date);
  const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });

  const dotCount = stops.length + 2;
  const stopLabel = stops.length === 0
    ? 'Direct'
    : stops.length === 1
      ? `1 stop in ${stops[0]}`
      : `${stops.length} stops via ${stops.join(', ')}`;

  const logoHtml = airlineCode
    ? `<img class="fw-logo" src="https://images.kiwi.com/airlines/64/${airlineCode}.png" alt="${airline}" width="20" height="20" style="width:20px;height:20px;max-width:20px;border-radius:50%;object-fit:contain;margin:0;box-shadow:none;" onerror="this.style.display='none'" />`
    : '';

  let trackHtml = '';
  for (let i = 0; i < dotCount; i++) {
    if (i > 0) trackHtml += '<span class="fw-dash"></span>';
    const fill = (i > 0 && i < dotCount - 1) ? ' fw-dot-fill' : '';
    trackHtml += `<span class="fw-dot${fill}"></span>`;
  }

  const infoText = stopLabel + (duration ? ` &middot; ${duration}` : '');

  return `<div class="flight-widget">
  <div class="fw-top">
    <div class="fw-airline">
      ${logoHtml}
      <span class="fw-name">${airline}</span>
    </div>
    <span class="fw-date">${dateStr}</span>
  </div>
  <div class="fw-route">
    <div class="fw-endpoint">
      ${departure ? `<span class="fw-time">${departure}</span>` : ''}
      <span class="fw-iata">${from}</span>
    </div>
    <div class="fw-middle">
      <div class="fw-track">${trackHtml}</div>
      <span class="fw-info">${infoText}</span>
    </div>
    <div class="fw-endpoint fw-endpoint-right">
      ${arrival ? `<span class="fw-time">${arrival}</span>` : ''}
      <span class="fw-iata">${to}</span>
    </div>
  </div>
</div>`;
}
