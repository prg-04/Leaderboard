import { getAllScores, createGame } from './fetchApi.js';

class UI {
  constructor() {
    this.addScores();
    this.gameId = '';
    this.scoresCont = document.getElementById('scores');
  }

  renderScores() {
    this.scoresCont.innerHTML = '';
    getAllScores()
      .then((items) => {
        console.log(items);
        items = items.filter((item) => item.score < 100000);
        items = items.slice(0, 100);

        items.forEach((item, index) => {
          const template = document.getElementById('template');
          const clone = template.content.cloneNode(true);
          const li = clone.querySelector('.score__item');
          const name = clone.querySelector('.score__name');
          const score = clone.querySelector('.score__score');
          name.textContent = `${item.user}: `;
          score.textContent = item.score;

          if (index % 2 === 0) {
            li.classList.add('gray__bg');
          } else {
            li.classList.add('white__bg');
          }

          this.scoresCont.appendChild(clone);
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addScores() {
    const form = document.querySelector('.add__score__form');
    createGame()
      .then((gameId) => {
        this.gameId = gameId;

        form.addEventListener('submit', async (e) => {
          e.preventDefault();
          const name = document.getElementById('name').value;
          const score = document.getElementById('score').value;
          await fetch(
            `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${this.gameId}/scores`,
            {
              method: 'POST',
              body: JSON.stringify({
                user: name,
                score,
              }),
              headers: {
                'Content-type': 'application/json; charset=UTF-8',
              },
            },
          );
          form.reset();
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

export default UI;
