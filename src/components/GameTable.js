import React from 'react'

const GameTable = ({cardsOnTable, playersHands}) => {
  return (
    <div className="game-board">
      <div className="table">{cardsOnTable}</div>
      <div className="players-hands">{playersHands}</div>
    </div>
  )
}

export default GameTable;