import React, { useEffect } from 'react'

const Main = () => {
  useEffect(() => {
    const paragraphs = document.querySelectorAll('p')
    paragraphs.forEach((paragraph, index) => {
      const hash = generateHash(paragraph.textContent || "")
    })
    console.log("hash")
  }, [])

  const generateHash = (text: string) => {
    let hash = 0
    if (text.length === 0) {
      return hash
    }
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash
    }
    return hash.toString(16)
  }
  return <></>
}
export default Main
