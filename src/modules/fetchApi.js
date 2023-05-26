let gameId;

export const createGame = async () => {
  try {
    const response = await fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/',
      {
        method: 'POST',
        body: JSON.stringify({
          name: 'My-game',
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );

    if (response.ok) {
      const json = await response.json();

      const { result } = json;
      const id = result.split(':')[1].split(' ')[1];

      gameId = id;
      return id;
    }
    throw new Error(`Failed to create game. Status: ${response.status}`);
  } catch (error) {
    return null;
  }
};

export const getAllScores = async () => {
  if (!gameId) {
    gameId = await createGame(); // Call createGame only if gameId is not set
  }

  const scores = await fetch(
    `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${gameId}/scores/`,
    {
      method: 'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  );

  if (scores.ok) {
    const json = await scores.json();

    return json.result;
  }
  return null;
};
