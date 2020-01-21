import React from "react";
import Button from "./Button";

const GameTable = ({
  btnText,
  canClickOnButton,
  cardsOnTableInRows,
  playersHands,
  handleClickOnNextCardBtn,
  giveSipsNumber,
  handleChangeSipsNumberToGive,
  sipsInfo
}) => {
  const sipsOptions = [];
  for (let i = 0; i < giveSipsNumber; i++) {
    sipsOptions.push(
      <option value={i + 1} key={i}>
        {i + 1}
      </option>
    );
  }
  const sipsInfoText = sipsInfo.map((sipInfo, i) => (
    <li key={i}>
      Player {sipInfo.name} drink {sipInfo.sips}{" "}
      {sipInfo.sips === 1 ? "sip" : "sips"}
    </li>
  ));
  return (
    <div className="game-board">
      <div className="table">{cardsOnTableInRows}</div>
      <div className="players-hands">{playersHands}</div>
      <div className="button">
        <Button
          text={btnText}
          additionalClasses="big"
          click={() => {
            if (canClickOnButton) {
              handleClickOnNextCardBtn();
            }
          }}
        />
        {/* {giveSipsNumber !== 0 && (
          <div className="info">
            <h3>Choose number of sips to give other player</h3>
            <select
              defaultValue={1}
              onChange={e => handleChangeSipsNumberToGive(e)}
            >
              {sipsOptions}
            </select>
          </div>
        )} */}

        <div className="info">
          {giveSipsNumber !== 0 && (
            <>
              <h3>Choose number of sips to give other player</h3>
              <select
                defaultValue={1}
                onChange={e => handleChangeSipsNumberToGive(e)}
              >
                {sipsOptions}
              </select>
            </>
          )}
          {sipsInfo.length && sipsInfoText}
        </div>
      </div>
    </div>
  );
};

export default GameTable;
