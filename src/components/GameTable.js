import React from 'react'
import Button from './Button'

const GameTable = ({
  btnText,
  canClickOnButton,
  cardsOnTableInRows,
  playersHands,
  handleClickOnNextCardBtn,
  giveSipsNumber,
  handleChangeSipsNumberToGive,
  sipsInfo,
}) => {
  const sipsOptions = []
  for (let i = 0; i < giveSipsNumber; i++) {
    sipsOptions.push(
      <option value={i + 1} key={i}>
        {i + 1}
      </option>
    )
  }

  const sipsInfoText = sipsInfo.map((sipInfo, i) => (
    <li key={i}>
      Player {sipInfo.name} drink {sipInfo.sips}{' '}
      {sipInfo.sips === 1 ? 'sip' : 'sips'}
    </li>
  ))

  const giveSipsInfo = (
    <>
      <h3>Choose number of sips to give other player</h3>
      <select
        className="select"
        defaultValue={1}
        onChange={(e) => handleChangeSipsNumberToGive(e)}
      >
        {sipsOptions}
      </select>
    </>
  )

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
              handleClickOnNextCardBtn()
            }
          }}
        />

        <div className="info">
          {giveSipsNumber !== 0 && giveSipsInfo}
          {sipsInfo.length !== 0 && sipsInfoText}
        </div>
      </div>
    </div>
  )
}

export default GameTable
