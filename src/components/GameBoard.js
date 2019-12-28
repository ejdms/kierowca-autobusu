import React from "react";
import PlayerHand from "./PlayerHand";
import GameTable from "./GameTable";

const GameBoard = ({ game, setGame, players, setPlayers }) => {
  const cardsOnTableNoRows = game.cardsOnTable.map(card => (
    <div className="card-on-table" key={card.id}>
      {card.symbol}
    </div>
  ));
  const cardsOnTable = (
    <>
      <div className="row row-1">{cardsOnTableNoRows.splice(0, 1)}</div>
      <div className="row row-2">{cardsOnTableNoRows.splice(0, 2)}</div>
      <div className="row row-3">{cardsOnTableNoRows.splice(0, 3)}</div>
      <div className="row row-4">{cardsOnTableNoRows.splice(0, 4)}</div>
      <div className="row row-5">{cardsOnTableNoRows.splice(0, 5)}</div>
      <div className="row row-1">{cardsOnTableNoRows.splice(0, 1)}</div>
    </>
  );

  const playersHands = players.map((player, i) => {
    // console.log(player)
    return (
      <PlayerHand cards={player.cards} name={player.name} key={i} />
    )
  });
  return (
    <GameTable cardsOnTable={cardsOnTable} playersHands={playersHands} />
    // <div className="game-board">
    //   <div className="table">{cardsOnTable}</div>
    //   <div className="players-hands">{playersHands}</div>
    // </div>
  );
};

export default GameBoard;
