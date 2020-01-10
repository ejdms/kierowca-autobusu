import React, { useState } from "react";
import PlayerHand from "./PlayerHand";
import GameTable from "./GameTable";
import Card from "./Card";

const GameBoard = ({ game, setGame, players, setPlayers }) => {
  const [text, setText] = useState("Next card");
  const [canClickOnButton, setCanClickOnButton] = useState(true);
  const [giveSips, setGiveSips] = useState([]);

  const handleClickOnNextCardBtn = () => {
    console.log("EXEC: handleClickOnNextCardBtn");

    const cardIndex = game.cardsOnTable.findIndex(card => !card.active);

    if (cardIndex !== -1) {
      const card = game.cardsOnTable[cardIndex];
      const cardId = card.id;

      console.log(`card.action.type: ${card.action.type}
      card.action.number: ${card.action.number}
      cardId: ${cardId}`);

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

      console.log("playersThatHaveTheSameCard: " + playersThatHaveTheSameCard);

      if (playersThatHaveTheSameCard.length) {
        console.log("playersThatHaveTheSameCard.length !== 0");

        playersThatHaveTheSameCard.forEach(playerWithTheSameCard => {
          const playerCards = [...playerWithTheSameCard.cards];

          playerCards.forEach(playerCard => {
            if (playerCard.symbol === card.symbol) {
              if (card.action === "drink") {
                const newPlayers = players.map(player => {
                  console.log(`
                  player.id: ${player.id}
                  playerWithTheSameCard.id: ${playerWithTheSameCard.id}`);
                  if (player.id === playerWithTheSameCard.id) {
                    player.sips = player.sips + card.action.number;
                  }
                  return player;
                });

                setPlayers([...newPlayers]);
              } else if (card.action === "give") {
                setGiveSips(prev => [
                  ...prev,
                  {
                    player: playerWithTheSameCard,
                    sips: prev.sips + card.action.number
                  }
                ]);
              }
            }
          });
        });
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

    console.log("END: handleClickOnNextCardBtn\n---------------------");
  };

  const handleClickOnPlayer = () => {
    console.log("EXEC: handleClickOnPlayer");
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
      btnText={text}
      cardsOnTableInRows={cardsOnTableInRows}
      playersHands={playersHands}
      handleClickOnNextCardBtn={handleClickOnNextCardBtn}
    />
  );
};

export default GameBoard;
