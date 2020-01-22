const randomizeArrayOrder = array => {
  const newArray = [...array];
  for (let i = 0; i < 15; i++) {
    newArray.sort(() => Math.random() - 0.5);
  }
  return newArray;
};

export default randomizeArrayOrder;
