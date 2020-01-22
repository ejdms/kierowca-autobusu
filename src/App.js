import React, { useState, useEffect } from "react";
import MainWrapper from "./components/MainWrapper";
import GameBoard from "./components/GameBoard";
import StartScreen from "./components/StartScreen";
import InitialPhaseScreen from "./components/InitialPhaseScreen";
import KierowcaAutobusuPhaseScreen from "./components/KierowcaAutobusuPhaseScreen";

import createCard from "./functions/createCard";
import randomizeArrayOrder from "./functions/randomizeArrayOrder";

const App = () => {
  const initialGameState = {
    numberOfPlayers: 0,
    cardsInGame: [],
    cardsOnTable: [],
    activeCard: null,
    startScreenVisible: true,
    gameInitialPhaseScreenVisible: false,
    gameBoardVisible: false,
    kierowcaAutubusuScreenVisible: false,
    playersWithKierowca: []
  };
  const [game, setGame] = useState({
    ...initialGameState
  });
  const [players, setPlayers] = useState([]);

  // useEffect(() => {
  //   setGame(prev => ({
  //     ...prev,
  //     kierowcaAutubusuScreenVisible: false
  //   }));
  // }, []);

  const handleGameReset = () => {
    setGame({
      ...initialGameState
    });
    setPlayers([]);
  };

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

    let howManyFigures = 0;

    howManyFigures = Math.floor(howManyCards / 4);
    if (howManyCards % 4 !== 0) {
      howManyFigures++;
    }

    for (let i = 0; i < howManyFigures; i++) {
      figuresPossible = [
        ...figuresPossible,
        ...figures.filter(card => card.id === i + 1)
      ];
    }

    let cardIndex = 0;
    for (let i = 0; i < figuresPossible.length; i++) {
      for (let j = 0; j < 4; j++) {
        const card = createCard({
          id: cardIndex + 1,
          symbol: figuresPossible[i].symbol,
          color: j % 2 ? "red" : "black",
          active: false
        });
        cardsPossible.push(card);
        cardIndex++;
      }
    }

    // const cardsPossibleRandom = [];
    // const cardsInGame = [];
    // let maxIndex = cardsPossible.length - 1;
    // const repeats = cardsPossible.length;

    // for (let i = 0; i < repeats; i++) {
    //   const randomIndex = Math.floor(Math.random() * maxIndex); //random index
    //   cardsPossibleRandom.push(cardsPossible[randomIndex]); //add random card from cardsPossible
    //   cardsInGame.push(cardsPossible[randomIndex]); //add random card from cardsPossible
    //   //delete used card
    //   cardsPossible.splice(randomIndex, 1);
    //   maxIndex--;
    // }

    const cardsPossibleRandom = randomizeArrayOrder(cardsPossible);

    const kierowcaCard = cardsPossibleRandom[15];
    let playerWithKierowcaExisting = false;

    players.forEach(player => {
      player.cards.forEach(card => {
        if (card === kierowcaCard) {
          playerWithKierowcaExisting = true;
        }
      });
    });

    if (!playerWithKierowcaExisting) {
      const playersCards = [];

      players.forEach(player => {
        player.cards.forEach(card => {
          playersCards.push(card);
        });
      });

      const randomIndex = Math.floor(Math.random() * (playersCards.length - 1));
      const randomCardThatIsKierowca = cardsPossibleRandom[randomIndex];
      const indexOfKierowcaCardInCardsPossible = cardsPossibleRandom.findIndex(
        cardPossible => cardPossible === randomCardThatIsKierowca
      );

      if (indexOfKierowcaCardInCardsPossible !== -1) {
        const card = cardsPossibleRandom.splice(
          indexOfKierowcaCardInCardsPossible,
          1
        );
        cardsPossibleRandom.push(card);
      }
    }

    const cardsInGame = [...cardsPossibleRandom];

    setGame(prev => ({
      ...prev,
      cardsInGame: [...cardsInGame]
    }));

    // generate cards on table
    const cardsOnTable = [...cardsPossibleRandom.splice(0, 16)];

    // ganerate cards on hands
    for (let i = 0; i < game.numberOfPlayers; i++) {
      const cardsOnHand = cardsPossibleRandom.splice(0, 2);
      const newPlayers = [...players];
      newPlayers[i].cards = cardsOnHand;

      setPlayers([...newPlayers]);
    }

    const cardsOnTableWithActions = cardsOnTable.map((card, index) => {
      let action = null;

      if (index === 0) {
        action = {
          type: "drink",
          number: 1
        };
      } else if (index < 3) {
        action = {
          type: "give",
          number: 2
        };
      } else if (index < 6) {
        action = {
          type: "drink",
          number: 3
        };
      } else if (index < 10) {
        action = {
          type: "give",
          number: 4
        };
      } else if (index < 15) {
        action = {
          type: "drink",
          number: 5
        };
      } else {
        action = {
          type: "kierowca",
          number: 6
        };
      }

      card.action = action;

      return card;
    });

    setGame(prev => ({
      ...prev,
      cardsOnTable: cardsOnTableWithActions
    }));
  };

  useEffect(() => {
    if (!game.startScreenVisible) {
      generateCards();
    }
  }, [game.startScreenVisible]);

  return (
    <MainWrapper>
      {game.startScreenVisible && (
        <StartScreen
          game={game}
          setGame={setGame}
          players={players}
          setPlayers={setPlayers}
        />
      )}
      {game.gameInitialPhaseScreenVisible && (
        <InitialPhaseScreen
          game={game}
          setGame={setGame}
          players={players}
          setPlayers={setPlayers}
        />
      )}
      {game.gameBoardVisible && (
        <GameBoard
          game={game}
          setGame={setGame}
          players={players}
          setPlayers={setPlayers}
        />
      )}
      {game.kierowcaAutubusuScreenVisible && (
        <KierowcaAutobusuPhaseScreen
          game={game}
          setGame={setGame}
          players={players}
          setPlayers={setPlayers}
          handleGameReset={handleGameReset}
        />
      )}
    </MainWrapper>
  );
};

export default App;
