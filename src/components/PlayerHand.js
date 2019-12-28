import React from "react";

const PlayerHand = ({ name, cards }) => {
  const cardsOnHand = cards.map((card, i) => {
    return (
      <div className={`card-on-hand${card.active ? " active" : ""}`} key={i}>
        {card.symbol}
      </div>
    );
  });
  return (
    <div className="player-hand">
      <div className="player-name">{name}</div>
      <div className="player-cards">{cardsOnHand}</div>
    </div>
  );
};

export default PlayerHand;
