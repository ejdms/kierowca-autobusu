import React, { useState, useEffect } from "react";
import PlayerHand from "./PlayerHand";
import GameTable from "./GameTable";
import Card from "./Card";

const GameBoard = ({ game, setGame, players, setPlayers }) => {
  const initialStates = {
    btnText: "Next card",
    canClickOnButton: true,
    giveSips: [],
    giveSipsNumber: 0,
    giveSipsNumberSelected: 0,
    sipsInfo: []
  };
  const [btnText, setBtnText] = useState(initialStates.btnText);
  const [canClickOnButton, setCanClickOnButton] = useState(
    initialStates.canClickOnButton
  );
  const [giveSips, setGiveSips] = useState(initialStates.giveSips);

  const [giveSipsNumber, setGiveSipsNumber] = useState(
    initialStates.giveSipsNumber
  );
  const [giveSipsNumberSelected, setGiveSipsNumberSelected] = useState(
    initialStates.giveSipsNumberSelected
  );
  const [sipsInfo, setSipsInfo] = useState(initialStates.sipsInfo);

  //RESET
  const reset = () => {
    setBtnText(initialStates.btnText);
    setCanClickOnButton(initialStates.canClickOnButton);
    setGiveSips(initialStates.giveSips);
  };
  useEffect(() => {
    reset();
  }, []);
  useEffect(() => {
    return () => {
      reset();
    };
  }, []);
  // /RESET

  const changeScreenToKierowca = () => {
    setTimeout(() => {
      setGame(prev => ({
        ...prev,
        gameBoardVisible: false,
        kierowcaAutubusuScreenVisible: true
      }));
    }, 1000);
  };

  useEffect(() => {
    if (giveSips.length) {
      setCanClickOnButton(false);

      // alow click on player hand but not on current player hand
      const currentPlayer = giveSips[0].player;
      const sips = giveSips[0].sips;
      setPlayers([
        ...players.map(player => {
          player.canClickOnHand = !(player.id === currentPlayer.id);
          return player;
        })
      ]);
      setGiveSipsNumber(sips);
      setGiveSipsNumberSelected(1);
    } else {
      setCanClickOnButton(true);
      setPlayers([
        ...players.map(player => {
          player.canClickOnHand = false;
          return player;
        })
      ]);

      const thereIsInactiveCardOnTable =
        game.cardsOnTable.findIndex(card => !card.active) !== -1;

      console.log(thereIsInactiveCardOnTable);

      if (!thereIsInactiveCardOnTable) {
        changeScreenToKierowca();
      }
    }
  }, [giveSips]);

  const handleChangeSipsNumberToGive = e => {
    const number = e.target.value;
    setGiveSipsNumberSelected(number);
  };

  const handleClickOnNextCardBtn = () => {
    setSipsInfo([]);
    const cardIndex = game.cardsOnTable.findIndex(card => !card.active);

    if (cardIndex !== -1) {
      const card = game.cardsOnTable[cardIndex];
      const cardId = card.id;

      const playersThatHaveTheSameCard = players.filter(player => {
        let sameCard = false;
        const symbol = card.symbol;
        player.cards.forEach(card => {
          if (card.symbol === symbol) {
            sameCard = true;
          }
        });
        if (sameCard) {
          return player;
        }
      });

      if (playersThatHaveTheSameCard.length) {
        playersThatHaveTheSameCard.forEach(playerWithTheSameCard => {
          const playerCards = [...playerWithTheSameCard.cards];

          playerCards.forEach((playerCard, i) => {
            if (playerCard.symbol === card.symbol) {
              if (card.action.type === "drink") {
                //TODO: CHANGE THIS TO FN TO NOT REPEAT CODE
                const newPlayers = players.map(player => {
                  if (player.id === playerWithTheSameCard.id) {
                    player.sips = player.sips + card.action.number;

                    const isThisPlayerAlreadyInSipsInfo =
                      sipsInfo.findIndex(
                        sipInfo =>
                          sipInfo.name.toLowerCase() ===
                          player.name.toLowerCase()
                      ) !== -1;

                    if (isThisPlayerAlreadyInSipsInfo) {
                      const newSipsInfo = sipsInfo.map(sipInfo => {
                        if (sipInfo.name === player.name) {
                          sipInfo.sips = sipInfo.sips + card.action.number;
                        }
                        return sipInfo;
                      });
                      setSipsInfo([...newSipsInfo]);
                    } else {
                      const newSipsInfoElement = {
                        name: player.name,
                        sips: card.action.number
                      };
                      setSipsInfo(prev => [...prev, newSipsInfoElement]);
                    }
                  }
                  return player;
                });

                setPlayers([...newPlayers]);
              } else if (card.action.type === "give") {
                // THIS SECTION CAN BE COMMENTED FOR EASIER DEVELOPMENT
                // UNCOMMENT FOR CORRECT GAMEPLAY
                //
                setGiveSips(prev => [
                  ...prev,
                  {
                    player: playerWithTheSameCard,
                    sips: card.action.number
                  }
                ]);
              } else if (card.action.type === "kierowca") {
                setGame(prev => ({
                  ...prev,
                  playersWithKierowca: [
                    ...prev.playersWithKierowca,
                    playerWithTheSameCard
                  ]
                }));
                setGiveSips(prev => [
                  ...prev,
                  {
                    player: playerWithTheSameCard,
                    sips: card.action.number
                  }
                ]);
                // TODO: REPATED CODE - CHANGE
                const newPlayers = players.map(player => {
                  if (player.id === playerWithTheSameCard.id) {
                    player.sips = player.sips + card.action.number;

                    const isThisPlayerAlreadyInSipsInfo =
                      sipsInfo.findIndex(
                        sipInfo =>
                          sipInfo.name.toLowerCase() ===
                          player.name.toLowerCase()
                      ) !== -1;

                    if (isThisPlayerAlreadyInSipsInfo) {
                      const newSipsInfo = sipsInfo.map(sipInfo => {
                        if (sipInfo.name === player.name) {
                          sipInfo.sips = sipInfo.sips + card.action.number;
                        }
                        return sipInfo;
                      });
                      setSipsInfo([...newSipsInfo]);
                    } else {
                      const newSipsInfoElement = {
                        name: player.name,
                        sips: card.action.number
                      };
                      setSipsInfo(prev => [...prev, newSipsInfoElement]);
                    }
                  }
                  return player;
                });

                setPlayers([...newPlayers]);
              }
            }
          });
        });
      }

      //

      const newCardsOnTable = game.cardsOnTable.map(card => {
        if (card.id === cardId) {
          card.active = true;
        }
        return card;
      });
      setGame(prev => ({
        ...prev,
        cardsOnTable: [...newCardsOnTable]
      }));
    }
  };

  const handleClickOnPlayer = id => {
    if (giveSips.length) {
      // const currentPlayer = giveSips[0].player;
      const sips = parseInt(giveSipsNumberSelected);

      const newPlayers = players.map(player => {
        if (player.id === id) {
          player.sips = player.sips + sips;
        }
        return player;
      });
      setPlayers([...newPlayers]);

      // const newGiveSips = giveSips.filter((sip, index) => index !== 0);
      const newGiveSips =
        sips === giveSipsNumber
          ? giveSips.filter((sip, index) => index !== 0)
          : giveSips.map((sip, index) => {
              if (index === 0) {
                sip.sips = sip.sips - sips;
              }
              return sip;
            });

      setGiveSips([...newGiveSips]);

      setGiveSipsNumber(prev => prev - sips);
      setGiveSipsNumberSelected(1);
    }
  };

  const cardsOnTableNoRows = game.cardsOnTable.map(card => (
    <Card
      onHand={false}
      symbol={card.symbol}
      color={card.color}
      key={card.id}
      active={card.active}
      action={card.action}
    />
  ));
  const cardsOnTableInRows = (
    <>
      <div className="row row-1">{cardsOnTableNoRows.splice(0, 1)}</div>
      <div className="row row-2">{cardsOnTableNoRows.splice(0, 2)}</div>
      <div className="row row-3">{cardsOnTableNoRows.splice(0, 3)}</div>
      <div className="row row-4">{cardsOnTableNoRows.splice(0, 4)}</div>
      <div className="row row-5">{cardsOnTableNoRows.splice(0, 5)}</div>
      <div className="row row-1">{cardsOnTableNoRows.splice(0, 1)}</div>
    </>
  );

  const playersHands = players.map(player => {
    return (
      <PlayerHand
        cards={player.cards}
        name={player.name}
        sips={player.sips}
        id={player.id}
        key={player.id}
        canClickOnHand={player.canClickOnHand}
        click={() => handleClickOnPlayer(player.id)}
      />
    );
  });
  return (
    <GameTable
      canClickOnButton={canClickOnButton}
      btnText={btnText}
      cardsOnTableInRows={cardsOnTableInRows}
      playersHands={playersHands}
      handleClickOnNextCardBtn={handleClickOnNextCardBtn}
      giveSipsNumber={giveSipsNumber}
      handleChangeSipsNumberToGive={handleChangeSipsNumberToGive}
      sipsInfo={sipsInfo}
    />
  );
};

export default GameBoard;
