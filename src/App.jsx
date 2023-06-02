import { useCallback } from 'react'
import './App.css'

import useFacts from './hooks/useFacts'
import useImage from './hooks/useImage'

export default function App () {
  const { fact, refreshFact } = useFacts()
  const { imageUrl, loading, setLoading } = useImage({ fact })

  const handleNewCatFact = useCallback(() => {
    setLoading(true)
    refreshFact()
  }, [refreshFact])

  return (
    <div>
      <h1>Cat Fact</h1>
      <button type='text' onClick={handleNewCatFact}>
        Get new fact
      </button>
      <section>
        {fact && <p>{fact}</p>}
        {loading && <h3>loading...</h3>}
        {imageUrl && <img src={imageUrl} alt='img' />}
      </section>
    </div>
  )
}
