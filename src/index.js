import "./styles.css";
import UI from "./modules/UI.js";
import { getAllScores, createGame } from "./modules/fetchApi.js";

document.addEventListener("DOMContentLoaded", () => {
  const ui = new UI();

  document.querySelector(".refresh__btn").addEventListener("click", () => {
    ui.renderScores();
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
      const scores = await fetchScores();
      console.log(scores);
      ui.renderScores();
    } catch (error) {
      console.error(error);
    }
  };

  displayScores();
});
