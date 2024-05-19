export const shuffle = (array) => {
  let currentIndex = array.length;
  const shuffledArray = [...array];

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray;
};

export const getAnswer = (players, guesses) => {
  let guessDict = {};

  for (let i = 0; i < guesses.length; i++) {
    guessDict[guesses[i][0]] = guesses[i][1];
  }

  let answer = {};
  for (let i = 0; i < players.length; i++) {
    answer[players[i].nickname] = {
      actualName: players[i].name,
      guessedName: guessDict[players[i].nickname],
      color: players[i].colour,
      isCorrect: players[i].name === guessDict[players[i].nickname],
    };
  }

  // oops reformat
  let reformatted = [];

  for (let i = 0; i < players.length; i++) {
    reformatted.push({
      nickname: guesses[i][0],
      actualName: answer[guesses[i][0]].actualName,
      guessedName: guesses[i][1],
      color: answer[guesses[i][0]].color,
      isCorrect: answer[guesses[i][0]].actualName === guesses[i][1],
    });
  }

  return reformatted;
};

// export const getCorrect = (guesses, players) => {
//   getAnswer(players);
// }
