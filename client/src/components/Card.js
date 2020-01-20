import React from "react";

const Card = ({ symbol, color, onHand, active }) => {
  return (
    <div
      className={`card ${color} ${onHand ? "on-hand" : "on-table"} ${
        active ? "active" : ""
      }`}
    >
      {symbol}
    </div>
  );
};
export default Card;
