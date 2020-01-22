import React from "react";
import Card from "./Card";

const PlayerHand = ({ name, cards, sips, canClickOnHand, click, id }) => {
  const cardsOnHand = cards.map((card, i) => {
    return (
      <Card
        onHand={true}
        symbol={card.symbol}
        active={card.active}
        color={card.color}
        key={i}
        id={card.id}
      />
    );
  });
  return (
    <div
      className={`player-hand ${canClickOnHand && "clickable"}`}
      onClick={() => {
        if (canClickOnHand) {
          click();
        }
      }}
    >
      <div className="player-name">
        {name} <span>Sipps: {sips}</span>
      </div>
      <div className="player-cards">{cardsOnHand}</div>
    </div>
  );
};

export default PlayerHand;
