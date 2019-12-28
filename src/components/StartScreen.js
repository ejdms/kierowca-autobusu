import React from "react";
import AddPlayerCard from "./AddPlayerCard";
import Button from "./Button";

const StartScreen = ({ game, setGame, players, setPlayers }) => {
  const { numberOfPlayers } = game;
  const handleAddPlayer = (name, resetName) => {
    if (name) {
      const newPlayer = {
        name,
        id: numberOfPlayers + 1,
        cards: []
      };
      setPlayers(prev => [...prev, newPlayer]);
      resetName();
      setGame(prev => ({
        ...prev,
        numberOfPlayers: prev.numberOfPlayers + 1
      }));
    }
  };
  //
  const handleRemovePlayer = id => {
    // console.log(id);
    const newPlayers = players.filter(player => player.id !== id);
    setPlayers([...newPlayers]);
    setGame(prev => ({
      ...prev,
      numberOfPlayers: prev.numberOfPlayers - 1
    }))
  };
  //
  const startGame = () => {
    if (game.numberOfPlayers > 1) {
      setGame(prev => ({
        ...prev,
        startScreen: false,
        play: true
      }));
    }
  };
  //
  const userCards = players.map(player => (
    <AddPlayerCard
      name={player.name}
      id={player.id}
      key={player.id}
      handleRemovePlayer={handleRemovePlayer}
    />
  ));
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
        <Button click={startGame} text='Start' />
          {/* <button onClick={startGame}>Start</button> */}
        </div>
      </div>
    </div>
  );
};

export default StartScreen;
