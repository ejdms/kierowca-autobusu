import React, { useState, useEffect } from "react";
import MainWrapper from "./components/MainWrapper";
import GameBoard from "./components/GameBoard";
import StartScreen from "./components/StartScreen";

const App = () => {
  const [game, setGame] = useState({
    numberOfPlayers: 2,
    cardsOnTable: [],
    activeCard: null,
    startScreen: true,
    play: false
  });
  const [players, setPlayers] = useState([
    { id: 1, name: "test1", cards: [] },
    { id: 2, name: "test2", cards: [] }
  ]);

  const generateCards = () => {
    const figures = [
      { id: 1, symbol: "A" },
      { id: 2, symbol: "K" },
      { id: 3, symbol: "Q" },
      { id: 4, symbol: "J" },
      { id: 5, symbol: "10" },
      { id: 6, symbol: "9" },
      { id: 7, symbol: "8" },
      { id: 8, symbol: "7" },
      { id: 9, symbol: "6" },
      { id: 10, symbol: "5" },
      { id: 11, symbol: "4" },
      { id: 12, symbol: "3" },
      { id: 13, symbol: "2" }
    ];

    let cardsPossible = [];
    let figuresPossible = [];

    const howManyCards = 16 + game.numberOfPlayers * 2;
    // console.log("howManyCards: " + howManyCards);

    let howManyFigures = 0;

    howManyFigures = Math.floor(howManyCards / 4);
    if (howManyCards % 4 !== 0) {
      howManyFigures++;
    }

    // console.log("howManyFigures: " + howManyFigures);

    for (let i = 0; i < howManyFigures; i++) {
      figuresPossible = [
        ...figuresPossible,
        ...figures.filter(card => card.id === i + 1)
      ];
      // console.log(i + ": " + figuresPossible);
    }
    // console.log(figuresPossible);

    let cardIndex = 0;
    for (let i = 0; i < figuresPossible.length; i++) {
      for (let j = 0; j < 4; j++) {
        cardsPossible.push({
          id: cardIndex + 1,
          symbol: figuresPossible[i].symbol
        });
        cardIndex++;
      }
    }
    // console.log(cardsPossible);

    const cardsPossibleRandom = [];
    let maxIndex = cardsPossible.length - 1;
    const repeats = cardsPossible.length;

    for (let i = 0; i < repeats; i++) {
      const randomIndex = Math.floor(Math.random() * maxIndex); //random index
      // console.log(i);
      cardsPossibleRandom.push(cardsPossible[randomIndex]); //add random card from cardsPossible
      //delete used card
      cardsPossible.splice(randomIndex, 1);
      maxIndex--;
    }

    // console.log(cardsPossible);
    // console.log(cardsPossibleRandom);

    // generate cards on table
    const cardsOnTable = [...cardsPossibleRandom.splice(0, 16)];
    // console.log(cardsOnTable, cardsPossibleRandom);

    // ganerate cards on hands
    for (let i = 0; i < game.numberOfPlayers; i++) {
      const cardsOnHand = cardsPossibleRandom.splice(0, 2);
      const newPlayers = [...players];
      newPlayers[i].cards = cardsOnHand;

      setPlayers([...newPlayers]);
    }

    setGame(prev => ({
      ...prev,
      cardsOnTable: cardsOnTable
    }));
  };

  useEffect(() => {
    // rozpoczęcie nowej gry
    if (!game.startScreen) {
      generateCards();
    }
  }, [game.startScreen]);

  return (
    <MainWrapper>
      {game.startScreen && (
        <StartScreen
          game={game}
          setGame={setGame}
          players={players}
          setPlayers={setPlayers}
        />
      )}
      <GameBoard
        game={game}
        setGame={setGame}
        players={players}
        setPlayers={setPlayers}
      />
    </MainWrapper>
  );
};

export default App;
