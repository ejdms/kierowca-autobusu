import React, { useState, useEffect } from "react";
import PlayerHand from "./PlayerHand";
import GameTable from "./GameTable";
import Card from "./Card";

const GameBoard = ({ game, setGame, players, setPlayers }) => {
  const [btnText, setBtnText] = useState("Next card");
  const [canClickOnButton, setCanClickOnButton] = useState(true);
  const [giveSips, setGiveSips] = useState([]);
  const [giveSipsText, setGiveSipsText] = useState("");

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
              if (card.action.type === "drink") {
                const newPlayers = players.map(player => {
                  if (player.id === playerWithTheSameCard.id) {
                    player.sips = player.sips + card.action.number;
                  }
                  return player;
                });

                setPlayers([...newPlayers]);
              } else if (card.action.type === "give") {
                setGiveSips(prev => [
                  ...prev,
                  {
                    player: playerWithTheSameCard,
                    sips: card.action.number
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

  const handleClickOnPlayer = id => {
    console.log("EXEC: handleClickOnPlayer");

    if (giveSips.length) {
      const currentPlayer = giveSips[0].player;
      const sips = giveSips[0].sips;

      console.log("player id: " + id);

      const newPlayers = players.map(player => {
        if (player.id === id) {
          player.sips = player.sips + sips;
        }
        return player;
      });
      setPlayers([...newPlayers]);

      const newGiveSips = giveSips.filter((sip, index) => index !== 0);
      console.log("newGiveSips: " + newGiveSips);
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
