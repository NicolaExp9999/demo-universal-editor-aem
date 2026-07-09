// blocks/faq/faq.js
export default function decorate(block) {
  const rows = [...block.children];

  const titleRow = rows.shift();
  const descRow = rows.shift();
  const itemsRow = rows.shift();

  if (titleRow) titleRow.className = 'faq-title';
  if (descRow) descRow.className = 'faq-description';
  if (!itemsRow) return;

  const container = itemsRow.querySelector('div') || itemsRow;
  const nodes = [...container.children];

  const groups = [];
  let current = [];
  nodes.forEach((node) => {
    if (node.tagName === 'HR') {
      if (current.length) groups.push(current);
      current = [];
    } else {
      current.push(node);
    }
  });
  if (current.length) groups.push(current);

  const list = document.createElement('div');
  list.className = 'faq-list';

  groups.forEach((group) => {
    if (!group.length) return;
    const [questionNode, ...answerNodes] = group;

    const details = document.createElement('details');
    details.className = 'faq-item';

    const summary = document.createElement('summary');
    summary.className = 'faq-question';
    summary.textContent = questionNode.textContent.trim();

    const answer = document.createElement('div');
    answer.className = 'faq-answer';
    answerNodes.forEach((n) => answer.append(n));

    details.append(summary, answer);
    list.append(details);
  });

  itemsRow.replaceWith(list);
  block.classList.add('faq');
}
