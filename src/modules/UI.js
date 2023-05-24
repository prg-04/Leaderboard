import Store from './store.js';

class UI {
  constructor() {
    this.items = new Store('scores').getItems();
    this.addScores();
    this.renderScores();
  }

  renderScores() {
    const scoresCont = document.getElementById('scores');
    scoresCont.innerHTML = '';

    this.items.forEach((item, index) => {
      const template = document.getElementById('template');
      const clone = template.content.cloneNode(true);
      const li = clone.querySelector('.score__item');
      const name = clone.querySelector('.score__name');
      const score = clone.querySelector('.score__score');
      name.textContent = `${item.name}: `;
      score.textContent = item.score;

      if (index % 2 === 0) {
        li.classList.add('gray__bg');
      } else {
        li.classList.add('white__bg');
      }

      scoresCont.appendChild(clone);
    });
  }

  addScores() {
    const form = document.querySelector('.add__score__form');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const score = document.getElementById('score').value;
      const item = {
        name,
        score,
      };
      this.items.push(item);
      new Store().setItems(this.items);
      this.renderScores();
      form.reset();
    });
  }
}

export default UI;
