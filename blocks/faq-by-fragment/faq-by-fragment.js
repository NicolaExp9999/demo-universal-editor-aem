// blocks/faq-by-fragment/faq-by-fragment.js
export default async function decorate(block) {
  const rows = [...block.children];

  const titleRow = rows.shift();
  const descRow = rows.shift();
  const endpointRow = rows.shift();

  const endpoint = endpointRow ? endpointRow.textContent.trim() : '';

  if (titleRow) titleRow.className = 'faq-title';
  if (descRow) descRow.className = 'faq-description';
  if (endpointRow) endpointRow.remove();

  const list = document.createElement('div');
  list.className = 'faq-list';
  list.textContent = 'Caricamento FAQ...';
  block.append(list);
  block.classList.add('faq');

  if (!endpoint) {
    list.textContent = 'Endpoint GraphQL non configurato.';
    return;
  }

  try {
    const res = await fetch(endpoint);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const json = await res.json();

    const items = Object.values(json?.data ?? {})?.[0]?.items ?? [];

    list.textContent = '';

    if (!items.length) {
      list.textContent = 'Nessuna FAQ disponibile.';
      return;
    }

    items.forEach((item) => {
      const question = item.titoloDomanda ?? '';
      const answerHtml = item.rispostaDomanda?.html ?? '';

      const details = document.createElement('details');
      details.className = 'faq-item';

      const summary = document.createElement('summary');
      summary.className = 'faq-question';
      summary.textContent = question;

      const answer = document.createElement('div');
      answer.className = 'faq-answer';
      answer.innerHTML = answerHtml;

      details.append(summary, answer);
      list.append(details);
    });
  } catch (err) {
    list.textContent = 'Errore nel caricamento delle FAQ.';
  }
}
