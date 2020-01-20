const fetchApiKey = async () => {
  let key = "";
  await fetch("../apiKeys.json")
    .then(res => res.json())
    .then(object => {
      key = object.genderApi;
    })
    .catch(err => {
      console.log(err);
      return;
    });
  return key;
};
const getGender = async name => {
  //
  //
  const apiKey = await fetchApiKey();

  const url = `https://gender-api.com/get?name=${name}&key=${apiKey}`;
  let result = null;

  await fetch(url)
    .then(res => res.json())
    .then(res => (result = res))
    .catch(err => {
      console.log("ERROR: " + err);
      result = { gender: null, accuracy: 0 };
    });

  return result;
};

export default getGender;
