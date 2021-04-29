import React from 'react'
import AddPlayerCard from '../components/AddPlayerCard'
import Button from '../components/Button'
import Checkbox from '../components/Checkbox'
import createPlayer from '../functions/createPlayer'

const StartScreen = ({ game, setGame, players, setPlayers }) => {
  const { numberOfPlayers } = game
  const handleAddPlayer = (name, resetName) => {
    let allowToAddPlayer = true
    if (players.length) {
      players.forEach((player) => {
        if (player.name.toLowerCase() === name.toLowerCase()) {
          allowToAddPlayer = false
        }
      })
    }
    if (name && allowToAddPlayer) {
      const newPlayer = createPlayer({
        name,
        id: numberOfPlayers + 1,
        cards: [],
      })
      setPlayers((prev) => [...prev, newPlayer])
      resetName()
      setGame((prev) => ({
        ...prev,
        numberOfPlayers: prev.numberOfPlayers + 1,
      }))
    }
  }
  //
  const handleRemovePlayer = (id) => {
    const newPlayers = players.filter((player) => player.id !== id)
    setPlayers([...newPlayers])
    setGame((prev) => ({
      ...prev,
      numberOfPlayers: prev.numberOfPlayers - 1,
    }))
  }
  //
  const startGame = () => {
    if (game.numberOfPlayers > 1) {
      setGame((prev) => ({
        ...prev,
        startScreenVisible: false,
        gameInitialPhaseScreenVisible: true,
      }))
    }
  }

  const handleCheckboxChange = (e) => {
    setGame({
      ...game,
      shouldAlwaysBeKierowca: e.currentTarget.checked,
    })
  }
  //
  const userCards = players.map((player) => (
    <AddPlayerCard
      name={player.name}
      id={player.id}
      key={player.id}
      handleRemovePlayer={handleRemovePlayer}
    />
  ))
  //
  return (
    <div className="start-screen">
      <div className="filled">
        <div className="upper">
          {userCards}
          {numberOfPlayers < 20 && (
            <AddPlayerCard type="addNew" handleAddPlayer={handleAddPlayer} />
          )}
        </div>
        <div className="bottom">
          <Button click={startGame} text="Start" />
        </div>
        <div className="shouldAlwaysBeKierowca-checkbox-wrapper">
          <label>
            <span>Should always be kierowca?</span>
            <Checkbox
              onChange={handleCheckboxChange}
              checked={game.shouldAlwaysBeKierowca}
              name="shouldAlwaysBeKierowca"
              id="shouldAlwaysBeKierowca"
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default StartScreen
