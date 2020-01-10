import React from "react";
import Button from "./Button";

const GameTable = ({
  btnText,
  canClickOnButton,
  cardsOnTableInRows,
  playersHands,
  handleClickOnNextCardBtn
}) => {
  return (
    <div className="game-board">
      <div className="table">{cardsOnTableInRows}</div>
      <div className="players-hands">{playersHands}</div>
      <div className="next">
        <Button
          text={btnText}
          additionalClasses="big"
          click={() => {
            if (canClickOnButton) {
              handleClickOnNextCardBtn();
            }
          }}
        />
      </div>
    </div>
  );
};

export default GameTable;
