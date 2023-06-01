import './App.css'

import useFacts from './hooks/useFacts'
import useImage from './hooks/useImage'

export default function App () {
  const { fact, refreshFact } = useFacts()
  const { imageUrl, loading, setLoading } = useImage({ fact })

  const handleNewCatFact = () => {
    setLoading(true)
    refreshFact()
  }

  return (
    <div>
      <h1>Cat Fact</h1>
      <button type='text' onClick={handleNewCatFact}>
        new cat fact
      </button>
      <section>
        {fact && <p>{fact}</p>}
        {loading && <p>loading...</p>}
        {imageUrl && <img src={imageUrl} alt='img' />}
      </section>
    </div>
  )
}
