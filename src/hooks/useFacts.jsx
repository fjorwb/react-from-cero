import { useEffect, useState } from 'react'

import getRamdomFact from '../services/getRamdomFact'

export default function useFacts () {
  const [fact, setFact] = useState('')

  console.log(fact)

  function refreshFact () {
    getRamdomFact().then(newFact => {
      setFact(newFact)
    })
  }

  useEffect(() => {
    refreshFact()
  }, [])

  return { fact, refreshFact }
}
