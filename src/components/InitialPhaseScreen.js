import React, { useState, useEffect } from "react";
import Card from "./Card";

const InitialPhaseScreen = ({ game, setGame, players, setPlayers }) => {
  const [initialGame, setInitialGame] = useState({
    completed: false,
    phase: 1,
    currentPlayer: players[0],
    shouldChangeCurrentPlayer: false,
    canClick: true
  });

  const {
    phase,
    currentPlayer,
    shouldChangeCurrentPlayer,
    canClick
  } = initialGame;

  useEffect(() => {
    console.log("EXEC: useEffect(phase)");
    if (shouldChangeCurrentPlayer) {
      //change current player or end of the initial phase
      const playerId = currentPlayer.id;
      const lastPlayerId = players[players.length - 1].id;
      console.log(`playerId: ${playerId}
    lastPlayerId: ${lastPlayerId}`);
      if (playerId === lastPlayerId) {
        //current player is last player
        setGame(prev => ({
          ...prev,
          gameInitialPhaseScreenVisible: false,
          gameBoardVisible: true
        }));
      } else {
        //take next player as current player
        const id = players.findIndex(player => player.id === playerId) + 1;
        const player = players[id];
        setInitialGame(prev => ({
          ...prev,
          currentPlayer: player
        }));
      }
      setInitialGame(prev => ({
        ...prev,
        shouldChangeCurrentPlayer: false
      }));
    }
  }, [initialGame.phase]);

  const handleClick = option => {
    console.log("EXEC: handleClick");

    if (canClick) {
      const playerId = currentPlayer.id;

      //phase 1
      if (option === "red" || option === "black") {
        const colorOfCurrentCard = currentPlayer.cards[0].color;

        const newPlayers = players.map(player => {
          if (player.id === playerId) {
            player.initialPhaseOneCompleted = true;
            if (option !== colorOfCurrentCard) {
              //if not win
              player.sips = player.sips + 1;
            }
          }
          return player;
        });

        setPlayers([...newPlayers]);
        setInitialGame(prev => ({
          ...prev,
          phase: 2
        }));
      } else if (option === "more" || option === "less" || option === "same") {
        //phase 2
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
        const indexOfFirstCardFigure = figures.findIndex(
          figure => figure === currentPlayer.cards[0].symbol
        );
        const indexOfSecondCardFigure = figures.findIndex(
          figure => figure === currentPlayer.cards[1].symbol
        );
        const reduce = indexOfSecondCardFigure - indexOfFirstCardFigure;
        let win = false;
        if (
          (option === "more" && reduce > 0) ||
          (option === "same" && reduce === 0) ||
          (option === "less" && reduce < 0)
        ) {
          win = true;
        }
        if (win) {
          const newPlayers = players.map(player => {
            if (player.id === playerId) {
              player.initialPhaseTwoCompleted = true;
            }
            return player;
          });
          setPlayers([...newPlayers]);
        } else {
          const newPlayers = players.map(player => {
            if (player.id === playerId) {
              player.initialPhaseTwoCompleted = true;
              player.sips = player.sips + 1;
            }
            return player;
          });
          setPlayers([...newPlayers]);
        }

        setInitialGame(prev => ({
          ...prev,
          canClick: false
        }));

        setTimeout(() => {
          setInitialGame(prev => ({
            ...prev,
            phase: 1,
            shouldChangeCurrentPlayer: true,
            canClick: true
          }));
        }, 1000);
      }
    }
  };

  const options = (
    <ul>
      {initialGame.phase === 1 ? (
        <>
          <li onClick={() => handleClick("red")}>Red</li>
          <li onClick={() => handleClick("black")}>Black</li>
        </>
      ) : (
        <>
          <li onClick={() => handleClick("more")}>More</li>
          <li onClick={() => handleClick("same")}>Same</li>
          <li onClick={() => handleClick("less")}>Less</li>
        </>
      )}
    </ul>
  );

  const cards = (
    <ul>
      {currentPlayer &&
        initialGame.currentPlayer.cards.map((card, i) => (
          <Card
            key={i}
            symbol={card.symbol}
            color={card.color}
            active={
              i % 2
                ? initialGame.currentPlayer.initialPhaseTwoCompleted
                : initialGame.currentPlayer.initialPhaseOneCompleted
            }
          />
        ))}
    </ul>
  );

  return (
    <div className="initial-phase">
      <div className="current-player-name">
        Current player: {currentPlayer && currentPlayer.name}
      </div>
      <div className="options">{options}</div>
      <div className="cards">{cards}</div>
      <div className="sips-meter">
        Sips of current player: {currentPlayer && currentPlayer.sips}
      </div>
    </div>
  );
};

export default InitialPhaseScreen;
