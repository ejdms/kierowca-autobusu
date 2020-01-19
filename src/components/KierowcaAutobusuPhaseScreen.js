import React, { useState, useEffect } from "react";
import Button from "./Button";
import Card from "./Card";

import getGender from "../functions/getGender";

const KierowcaAutobusuPhaseScreen = ({
  game,
  setGame,
  players,
  setPlayers,
  handleGameReset
}) => {
  const allPlayers = [...players];
  // CHANGE INITIAL STATE TO ALL PLAYERS AND CARDS FOR EASIER DEVELOPMENT
  // UNCOMMENT FOR CORRECT GAMEPLAY
  //
  // const initialKierowcaState = {
  //   cardsInDeck: game.cardsInGame,
  //   playersWithKierowca: game.playersWithKierowca,
  //   currentPlayer: game.playersWithKierowca[0],
  //   phase: 1,
  //   cardsOnTheTable: [],
  //   numberOfCardsLeft: game.cardsInGame.length,
  //   infoText: "",
  //   gameOver: false
  // };

  const initialKierowcaState = {
    cardsInDeck: [...game.cardsInGame],
    playersWithKierowca: [...players],
    currentPlayer: players[0],
    phase: 1,
    cardsOnTheTable: [],
    numberOfCardsLeft: game.cardsInGame.length,
    infoText: "",
    gameOver: false
  };
  const [kierowca, setKierowca] = useState({
    ...initialKierowcaState
  });
  const {
    cardsInDeck,
    playersWithKierowca,
    currentPlayer,
    phase,
    cardsOnTheTable,
    numberOfCardsLeft,
    infoText
  } = kierowca;
  //

  //RESET
  const reset = () => {
    setKierowca({
      ...initialKierowcaState
    });
  };
  useEffect(() => {
    // console.log("EXEC: useEffect([])");
    reset();
  }, []);
  useEffect(() => {
    return () => {
      // console.log("EXEC: useEffect([return])");
      reset();
    };
  }, []);
  // /RESET

  const card = cardsInDeck[0];
  const currentPlayerId = currentPlayer ? currentPlayer.id : null;

  const correctChoice = () => {
    // console.log("EXEC: correctCoice");
    setKierowca(prev => ({
      ...prev,
      cardsOnTheTable: [...prev.cardsOnTheTable, card],
      phase: prev.phase + 1
    }));
  };

  const incorrectChoice = () => {
    // console.log("EXEC: incorrectCoice");
    const newPlayers = allPlayers.map(player => {
      console.log(player.id === currentPlayerId);
      if (player.id === currentPlayerId) {
        player.sips += 1;
      }
      return player;
    });
    setPlayers([...newPlayers]);

    setKierowca(prev => ({
      ...prev,
      cardsOnTheTable: [],
      phase: 1
    }));

    getText(false);
  };

  const getText = async updateCurrentPlayer => {
    const sipsNumber = currentPlayer.sips;
    let text = "";

    if (updateCurrentPlayer) {
      const genderInfo = await getGender(currentPlayer.name);
      const { gender, accuracy } = genderInfo;

      text = `Now playing ${currentPlayer.name}. `;

      if (accuracy < 66) {
        text += `Number of sips: ${currentPlayer.sips}`;
      } else {
        text += `${gender === "male" ? "He" : "She"} have total ${sipsNumber} ${
          sipsNumber === 1 ? "sip" : "sips"
        }`;
      }
    } else {
      const arrayFromString = infoText.split("");

      const index = arrayFromString.findIndex(char => {
        // console.log(char);
        return /^[0-9]$/.test(char);
      });

      arrayFromString.splice(index, arrayFromString.length - 1);

      text = arrayFromString.join("") + sipsNumber;
    }
    if (text) {
      setKierowca(prev => ({
        ...prev,
        infoText: text
      }));
    }
  };

  const nextPlayer = () => {
    // console.log("EXEC: nextPlayer");
    setKierowca(prev => ({
      cardsInDeck: [...game.cardsInGame],
      playersWithKierowca: prev.playersWithKierowca.filter(
        (player, i) => i !== 0
      ),
      phase: 1,
      cardsOnTheTable: []
    }));
  };

  const gameOver = () => {
    // console.log("EXEC: gameOver");
    setKierowca(prev => ({
      ...prev,
      gameOver: true
    }));
  };

  const handleClick = type => {
    // console.log("EXEC: handleClick");
    if (type === "black" || type === "red") {
      const color = card.color;
      const correct = type === color;

      if (correct) {
        // console.log("EXEC: correctCoice(correct)");
        correctChoice();
      } else {
        // console.log("EXEC: correctCoice(incorrect)");
        incorrectChoice();
      }
    } else {
      const figures = [
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "J",
        "Q",
        "K",
        "A"
      ];
      const previousCard = cardsOnTheTable[cardsOnTheTable.length - 1];

      const indexOfPreviousCardSymbol = figures.findIndex(
        figure => figure === previousCard.symbol
      );
      const indexOfClickedCardSymbol = figures.findIndex(
        figure => figure === card.symbol
      );
      const reduce = indexOfClickedCardSymbol - indexOfPreviousCardSymbol;

      let correct = false;
      if (
        (type === "more" && reduce > 0) ||
        (type === "same" && reduce === 0) ||
        (type === "less" && reduce < 0)
      ) {
        correct = true;
      }

      if (correct) {
        correctChoice();
      } else {
        incorrectChoice();
      }
    }

    setKierowca(prev => ({
      ...prev,
      cardsInDeck: prev.cardsInDeck.filter((card, i) => i !== 0)
    }));
  };

  useEffect(() => {
    // console.log("EXEC: useEffect(phase)");
    if (phase === 6) {
      setTimeout(() => {
        if (playersWithKierowca.length > 1) {
          nextPlayer();
        } else {
          gameOver();
        }
      }, 1000);
    }
  }, [phase]);

  useEffect(() => {
    // console.log("EXEC: useEffect(currentPlayer)");
    if (currentPlayer) {
      getText(true);
    }
  }, [currentPlayer]);

  useEffect(() => {
    // console.log("EXEC: useEffect(cardsInDeck)");
    if (!cardsInDeck.length) {
      if (playersWithKierowca.length) {
        nextPlayer();
      } else {
        gameOver();
      }
    }
  }, [cardsInDeck]);

  useEffect(() => {
    // console.log("EXEC: useEffect(playersWithKierowca)");
    if (playersWithKierowca.length) {
      setKierowca(prev => ({
        ...prev,
        currentPlayer: prev.playersWithKierowca[0]
      }));
    } else {
      gameOver();
    }
  }, [playersWithKierowca]);

  useEffect(() => {
    // console.log("EXEC: useEffect(cardsInDeck)");
    setKierowca(prev => ({
      ...prev,
      numberOfCardsLeft: cardsInDeck.length
    }));
  }, [cardsInDeck]);

  useEffect(() => {
    // console.log("EXEC: useEffect(playersWithKierowca)");
    const players = allPlayers.map(player => {
      playersWithKierowca.forEach(playerWithKierowca => {
        if (player.id === playerWithKierowca.id) {
          player.sips = playerWithKierowca.sips;
        }
      });
      return player;
    });

    setPlayers([...players]);
  }, [playersWithKierowca]);

  let content = "";

  if (!kierowca.gameOver) {
    const phaseOneButtons = (
      <>
        <li onClick={() => handleClick("red")}>Red</li>
        <li onClick={() => handleClick("black")}>Black</li>
      </>
    );
    const phaseTwoAndMoreButtons = (
      <>
        <li onClick={() => handleClick("more")}>More</li>
        <li onClick={() => handleClick("same")}>Same</li>
        <li onClick={() => handleClick("less")}>Less</li>
      </>
    );
    const buttons = (
      <ul>{phase === 1 ? phaseOneButtons : phaseTwoAndMoreButtons}</ul>
    );
    const cards = cardsOnTheTable.map(card => (
      <Card
        symbol={card.symbol}
        key={card.id}
        id={card.id}
        color={card.color}
        active={true}
      />
    ));

    content = (
      <div className="kierowca">
        <div className="buttons">{buttons}</div>
        <div className="cards">{cards}</div>
        <div className="info">
          <div className="info-1">{infoText}</div>
          <div className="info-2">{`Number of cards left: ${numberOfCardsLeft}`}</div>
        </div>
      </div>
    );
  } else {
    const scores = (
      <ul>
        {players.map(player => (
          <li className="player" key={player.id}>
            <h3>Name: {player.name}</h3>
            <p>Sips: {player.sips}</p>
          </li>
        ))}
      </ul>
    );
    content = (
      <div className="end-screen">
        <h1>The End</h1>
        <Button
          text="reset"
          additionalClasses="upper"
          click={handleGameReset}
        />
        <div className="scores">
          <h1>Total scores</h1>
          {scores}
        </div>
      </div>
    );
  }

  return <div className="kierowca-screen">{content}</div>;
};

export default KierowcaAutobusuPhaseScreen;
