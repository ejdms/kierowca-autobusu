const randomizeArrayOrder = array => {
  const inputArray = [...array];
  const newArray = [];
  const numberOfItems = inputArray.length;
  let indexesAvailable = inputArray.length - 1;

  for (let i = 0; i < numberOfItems; i++) {
    const randomIndex = Math.floor(Math.random() * indexesAvailable);
    newArray.push(inputArray[randomIndex]);
    inputArray.splice(randomIndex, 1);
    indexesAvailable--;
  }

  return newArray;
};

export default randomizeArrayOrder;
