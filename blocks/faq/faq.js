// blocks/faq/faq.js
export default function decorate(block) {
  const rows = [...block.children];

  const titleRow = rows.shift();
  const descRow = rows.shift();

  if (titleRow) titleRow.className = 'faq-title';
  if (descRow) descRow.className = 'faq-description';

  rows.forEach((row) => {
    const [questionDiv, answerDiv] = row.children;
    if (!questionDiv || !answerDiv) return;

    const details = document.createElement('details');
    details.className = 'faq-item';

    const summary = document.createElement('summary');
    summary.className = 'faq-question';
    summary.textContent = questionDiv.textContent.trim();

    const answer = document.createElement('div');
    answer.className = 'faq-answer';
    answer.innerHTML = answerDiv.innerHTML;

    details.append(summary, answer);
    row.replaceWith(details);
  });

  block.classList.add('faq');
}
