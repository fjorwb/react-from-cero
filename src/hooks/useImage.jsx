import { useEffect, useState } from 'react'

const CAT_URL_IMAGE = 'https://cataas.com'

export default function useImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!fact) return

    const firstThreeWords = fact?.split(' ').slice(0, 3).join(' ')
    fetch(
      `https://cataas.com/cat/says/${firstThreeWords}?size=300&color=red&json=true`
    )
      .then(res => res.json())
      .then(resp => {
        const { url } = resp
        setImageUrl(url)
        setLoading(false)
      })
      .catch(err => console.log(err))
  }, [fact])

  return { imageUrl: `${CAT_URL_IMAGE}${imageUrl}`, loading, setLoading }
}
