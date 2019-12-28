import React from "react";

const Card = ({ size = "big", symbol }) => {
  return <div className={`card ${size}`}>{symbol}</div>;
};
export default Card;
