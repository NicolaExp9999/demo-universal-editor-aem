// blocks/faq/faq.js test
export default function decorate(block) {
  const rows = [...block.children];

  const titleRow = rows.shift();
  const descRow = rows.shift();

  if (titleRow) {
    titleRow.className = 'faq-title';
  }
  if (descRow) {
    descRow.className = 'faq-description';
  }

  rows.forEach((row) => {
    const [questionDiv, answerDiv] = row.children;
    if (!questionDiv || !answerDiv) return;

    const item = document.createElement('div');
    item.className = 'faq-item';

    const button = document.createElement('button');
    button.className = 'faq-question';
    button.type = 'button';
    button.setAttribute('aria-expanded', 'false');
    button.textContent = questionDiv.textContent.trim();

    const answer = document.createElement('div');
    answer.className = 'faq-answer';

    const answerInner = document.createElement('div');
    answerInner.className = 'faq-answer-inner';
    answerInner.innerHTML = answerDiv.innerHTML;
    answer.append(answerInner);

    button.addEventListener('click', () => {
      const isOpen = item.classList.toggle('is-open');
      button.setAttribute('aria-expanded', String(isOpen));
    });

    item.append(button, answer);
    row.replaceWith(item);
  });

  block.classList.add('faq');
}
