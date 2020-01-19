const createPlayer = ({
  name,
  id,
  cards = [],
  initialPhaseOneCompleted = false,
  initialPhaseTwoCompleted = false,
  sips = 0,
  canClickOnHand = false
}) => ({
  id,
  name,
  cards,
  initialPhaseOneCompleted,
  initialPhaseTwoCompleted,
  sips,
  canClickOnHand
});

export default createPlayer;
