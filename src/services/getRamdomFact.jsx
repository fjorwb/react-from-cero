const CAT_ENDPOINT_FACT = 'https://catfact.ninja/fact'

export default async function getRamdomFact () {
  const fact = await fetch(CAT_ENDPOINT_FACT)
    .then(res => res.json())
    .then(data => {
      const { fact } = data
      return fact
    })
    .catch(err => console.log(err))

  return fact
}
