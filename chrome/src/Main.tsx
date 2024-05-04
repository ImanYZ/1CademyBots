import React, { useEffect, useState } from 'react'
import { extractObjectUpToKey, getURL } from './utils/common'
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore'
import { initFirebaseClientSDK } from './utils/firestoreClient.config'
initFirebaseClientSDK()

interface Paragraph {
  id: string
  hash: string
  content: string
}
const Main = () => {
  const db = getFirestore()
  const [paragraphs, setParagraphs] = useState<Paragraph[]>([])
  const [selectedParagraphId, setSelectedParagraphId] = useState<string | null>(
    null
  )
  useEffect(() => {
    ;(async () => {
      const url = getURL()
      const q = query(collection(db, 'chaptersBook'), where('url', '==', url))
      const docs = await getDocs(q)
      const chapterParagraphs = docs.docs[0].data()?.paragraphs
      const paragraphs = document.querySelectorAll(`*`)
      const allParagraphs: Paragraph[] = []
      let videoId = 1
      paragraphs.forEach((paragraph, index) => {
        if (paragraph.id.startsWith('figure-')) {
          const chapterParagraph = chapterParagraphs.find((cParagraph: any) =>
            cParagraph.ids.includes(paragraph.id)
          )
          const text = chapterParagraph.text
          const hash: any = generateHash(text || '')
          allParagraphs.push({ id: paragraph.id, hash, content: text || '' })
        } else if (paragraph.id.startsWith('eb')) {
          const hash: any = generateHash(paragraph.textContent || '')
          allParagraphs.push({
            id: paragraph.id,
            hash,
            content: paragraph.textContent || '',
          })
        } else if (paragraph.getAttribute('data-video-id')) {
          const chapterParagraph = chapterParagraphs.find((cParagraph: any) =>
            cParagraph.ids.includes('youtube-core-econ-' + videoId)
          )
          const id = paragraph.getAttribute('data-video-id')
          const hash: any = generateHash(chapterParagraph.text || '')
          allParagraphs.push({
            id: id || '',
            hash,
            content: chapterParagraph.text || '',
          })
        }
      })
      setParagraphs(allParagraphs)
      document.body.addEventListener('mouseover', (event: any) => {
        const target = event.target
        if (
          target?.id?.includes('eb-') ||
          target?.id?.includes('figure-') ||
          target.getAttribute('data-video-id')
        ) {
          const hashIcon = document.querySelector(
            '#onecademy-icon'
          ) as HTMLElement
          const rect = target?.getBoundingClientRect()
          if (hashIcon) {
            hashIcon.style.display = 'block'
            hashIcon.style.position = 'absolute'
            hashIcon.style.top = `${rect.top + window.scrollY + 5}px`
            hashIcon.style.left = `${rect.left - 50}px`
          }
          if (target.getAttribute('data-video-id')) {
            setSelectedParagraphId(target.getAttribute('data-video-id'))
          } else {
            setSelectedParagraphId(target?.id)
          }
        }
      })
    })()
  }, [])

  const handleClick = async () => {
    const data = extractObjectUpToKey(paragraphs, selectedParagraphId || '')
    console.log(Array.from(data), 'data00data')
    chrome.runtime.sendMessage({
      action: 'createNewTab',
      url: 'https://1cademy.com/notebook',
      data,
    })
  }

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
  return (
    <div>
      <img
        style={{ display: 'none', cursor: 'pointer' }}
        id="onecademy-icon"
        src={chrome.runtime.getURL('images/icon-2x.png')}
        alt="icon"
        onClick={() => handleClick()}
      />
    </div>
  )
}
export default Main
