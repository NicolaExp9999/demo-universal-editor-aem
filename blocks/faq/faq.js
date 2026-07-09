// blocks/faq/faq.js test
export default function decorate(block) {
  [...block.children].forEach((row) => {
    const [questionDiv, answerDiv] = row.children;
    if (!questionDiv || !answerDiv) return;

    const item = document.createElement('div');
    item.className = 'faq-item';

    const button = document.createElement('button');
    button.className = 'faq-question';
    button.type = 'button';
    button.textContent = questionDiv.textContent.trim();

    const answer = document.createElement('div');
    answer.className = 'faq-answer';
    answer.innerHTML = answerDiv.innerHTML;

    button.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      item.classList.toggle('is-open', !isOpen);
      answer.style.maxHeight = !isOpen ? `${answer.scrollHeight}px` : '0';
    });

    item.append(button, answer);
    row.replaceWith(item);
  });

  block.classList.add('faq');
}
