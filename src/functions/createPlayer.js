const createPlayer = ({
  name,
  id,
  cards = [],
  initialPhaseOneCompleted = false,
  initialPhaseTwoCompleted = false,
  sips = 0,
  kierowca = false,
  canClickOnHand = false
}) => ({
  id,
  name,
  cards,
  initialPhaseOneCompleted,
  initialPhaseTwoCompleted,
  sips,
  kierowca,
  canClickOnHand
});

export default createPlayer;
