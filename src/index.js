import './styles.css';
import UI from './modules/UI.js';
import { getAllScores, createGame } from './modules/fetchApi.js';

const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
  const refreshBtn = document.querySelector('.refresh__btn');
  refreshBtn.addEventListener('click', () => {
    ui.renderScores();
  });
});

let gameId;
const fetchScores = async () => {
  if (!gameId) {
    gameId = await createGame();
  }

  const scores = await getAllScores();

  return scores;
};

const displayScores = async () => {
  try {
    await fetchScores();
    ui.renderScores();
  } catch (error) {
    console.error(error);
  }
};

displayScores();
