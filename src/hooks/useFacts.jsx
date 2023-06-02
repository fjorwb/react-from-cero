import { useEffect, useState } from 'react'

import getRamdomFact from '../services/getRamdomFact'

export default function useFacts () {
  const [fact, setFact] = useState('')

  useEffect(() => {
    refreshFact()
  }, [])

  function refreshFact () {
    getRamdomFact().then(newFact => {
      setFact(newFact)
    })
  }

  return { fact, refreshFact }
}
