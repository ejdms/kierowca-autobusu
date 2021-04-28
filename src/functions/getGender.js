let apiKeys = null
try {
  apiKeys = require('../apiKeys.json')
} catch (e) {}

const getGender = async (name) => {
  if (!apiKeys) {
    return { gender: null, accuracy: 0 }
  }
  const apiKey = apiKeys.genderApi

  if (apiKey) {
    const url = `https://gender-api.com/get?name=${name}&key=${apiKey}`
    let result = null

    await fetch(url)
      .then((res) => res.json())
      .then((res) => (result = res))
      .catch((err) => {
        console.log('ERROR: ' + err)
        result = { gender: null, accuracy: 0 }
      })

    return result
  } else {
    return { gender: null, accuracy: 0 }
  }
}

export default getGender
