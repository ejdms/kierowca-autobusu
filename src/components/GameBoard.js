import React, { useState, useEffect } from "react";
import PlayerHand from "./PlayerHand";
import GameTable from "./GameTable";
import Card from "./Card";

const GameBoard = ({ game, setGame, players, setPlayers }) => {
  const initialStates = {
    btnText: "Next card",
    canClickOnButton: true,
    giveSips: [],
    giveSipsText: "",
    checkForKierowca: false
  };
  const [btnText, setBtnText] = useState(initialStates.btnText);
  const [canClickOnButton, setCanClickOnButton] = useState(
    initialStates.canClickOnButton
  );
  const [giveSips, setGiveSips] = useState(initialStates.giveSips);
  const [giveSipsText, setGiveSipsText] = useState(initialStates.giveSipsText);
  const [checkForKierowca, setCheckForKierowca] = useState(
    initialStates.checkForKierowca
  );

  //RESET
  const reset = () => {
    setBtnText(initialStates.btnText);
    setCanClickOnButton(initialStates.canClickOnButton);
    setGiveSips(initialStates.giveSips);
    setGiveSipsText(initialStates.giveSipsText);
    setCheckForKierowca(initialStates.checkForKierowca);
  };
  useEffect(() => {
    reset();
  }, []);
  useEffect(() => {
    return () => {
      reset();
    };
  }, []);
  // /RESET

  useEffect(() => {
    if (giveSips.length) {
      setCanClickOnButton(false);

      // alow click on player hand but not on current player hand
      const currentPlayer = giveSips[0].player;
      const sips = giveSips[0].sips;
      setPlayers([
        ...players.map(player => {
          player.canClickOnHand = !(player.id === currentPlayer.id);
          return player;
        })
      ]);
      setGiveSipsText(
        `Player ${currentPlayer.name} give ${sips} ${
          sips === 1 ? "sip" : "sips"
        } to other player (click on other player cards)`
      );
    } else {
      setCanClickOnButton(true);
      setGiveSipsText("");
      setPlayers([
        ...players.map(player => {
          player.canClickOnHand = false;
          return player;
        })
      ]);
    }
  }, [giveSips]);

  const handleClickOnNextCardBtn = () => {
    const cardIndex = game.cardsOnTable.findIndex(card => !card.active);

    if (cardIndex !== -1) {
      const card = game.cardsOnTable[cardIndex];
      const cardId = card.id;

      const playersThatHaveTheSameCard = players.filter(player => {
        let sameCard = false;
        const symbol = card.symbol;
        player.cards.forEach(card => {
          if (card.symbol === symbol) {
            sameCard = true;
          }
        });
        if (sameCard) {
          return player;
        }
      });

      if (playersThatHaveTheSameCard.length) {
        playersThatHaveTheSameCard.forEach(playerWithTheSameCard => {
          const playerCards = [...playerWithTheSameCard.cards];

          playerCards.forEach((playerCard, i) => {
            if (playerCard.symbol === card.symbol) {
              if (card.action.type === "drink") {
                const newPlayers = players.map(player => {
                  if (player.id === playerWithTheSameCard.id) {
                    player.sips = player.sips + card.action.number;
                  }
                  return player;
                });

                setPlayers([...newPlayers]);
              } else if (card.action.type === "give") {
                // THIS SECTION CAN BE COMMENTED FOR EASIER DEVELOPMENT
                // UNCOMMENT FOR CORRECT GAMEPLAY
                //
                setGiveSips(prev => [
                  ...prev,
                  {
                    player: playerWithTheSameCard,
                    sips: card.action.number
                  }
                ]);
              } else if (card.action.type === "kierowca") {
                setGame(prev => ({
                  ...prev,
                  playersWithKierowca: [
                    ...prev.playersWithKierowca,
                    playerWithTheSameCard
                  ]
                }));
              }
            }
          });
        });
      }

      //
      if (card.action.type === "kierowca") {
        setTimeout(() => {
          setGame(prev => ({
            ...prev,
            gameBoardVisible: false,
            kierowcaAutubusuScreenVisible: true
          }));
        }, 1000);
      }

      const newCardsOnTable = game.cardsOnTable.map(card => {
        if (card.id === cardId) {
          card.active = true;
        }
        return card;
      });
      setGame(prev => ({
        ...prev,
        cardsOnTable: [...newCardsOnTable]
      }));
    }
  };

  const handleClickOnPlayer = id => {
    if (giveSips.length) {
      const currentPlayer = giveSips[0].player;
      const sips = giveSips[0].sips;

      const newPlayers = players.map(player => {
        if (player.id === id) {
          player.sips = player.sips + sips;
        }
        return player;
      });
      setPlayers([...newPlayers]);

      const newGiveSips = giveSips.filter((sip, index) => index !== 0);
      setGiveSips([...newGiveSips]);
    }
  };

  const cardsOnTableNoRows = game.cardsOnTable.map(card => (
    <Card
      onHand={false}
      symbol={card.symbol}
      color={card.color}
      key={card.id}
      active={card.active}
      action={card.action}
    />
  ));
  const cardsOnTableInRows = (
    <>
      <div className="row row-1">{cardsOnTableNoRows.splice(0, 1)}</div>
      <div className="row row-2">{cardsOnTableNoRows.splice(0, 2)}</div>
      <div className="row row-3">{cardsOnTableNoRows.splice(0, 3)}</div>
      <div className="row row-4">{cardsOnTableNoRows.splice(0, 4)}</div>
      <div className="row row-5">{cardsOnTableNoRows.splice(0, 5)}</div>
      <div className="row row-1">{cardsOnTableNoRows.splice(0, 1)}</div>
    </>
  );

  const playersHands = players.map(player => {
    return (
      <PlayerHand
        cards={player.cards}
        name={player.name}
        sips={player.sips}
        id={player.id}
        key={player.id}
        canClickOnHand={player.canClickOnHand}
        click={() => handleClickOnPlayer(player.id)}
      />
    );
  });
  return (
    <GameTable
      canClickOnButton={canClickOnButton}
      btnText={btnText}
      giveSipsText={giveSipsText}
      cardsOnTableInRows={cardsOnTableInRows}
      playersHands={playersHands}
      handleClickOnNextCardBtn={handleClickOnNextCardBtn}
    />
  );
};

export default GameBoard;
