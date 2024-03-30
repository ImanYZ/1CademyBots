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
initFirebaseClientSDK();

interface ParagraphProp {
  hash: string
  content: string
}
interface Paragraph {
  [key: string]: ParagraphProp
}
const Main = () => {
  const db = getFirestore()
  const [paragraphs, setParagraphs] = useState<Paragraph>({})
  const [selectedParagraphId, setSelectedParagraphId] = useState<string | null>(
    null
  )
  useEffect(() => {
    ;(async () => {
      const url = getURL()
      const q = query(collection(db, 'chaptersBook'), where('url', '==', url))
      const docs = await getDocs(q)
      console.log(docs.docs[0], "docs.docs[0]--docs.docs[0]")
      const paragraphs = document.querySelectorAll('[id^=eb]')
      const allParagraphs: Paragraph = {}
      paragraphs.forEach((paragraph, index) => {
        const hash: any = generateHash(paragraph.textContent || '')
        allParagraphs[paragraph.id] = {
          hash,
          content: paragraph.textContent || '',
        }
      })
      setParagraphs(allParagraphs)
      document.body.addEventListener('mouseover', (event: any) => {
        const target = event.target
        if (target?.id?.includes('eb-')) {
          const hashIcon = document.querySelector(
            '#onecademy-icon'
          ) as HTMLElement
          const rect = target?.getBoundingClientRect()
          if (hashIcon) {
            hashIcon.style.display = 'block'
            hashIcon.style.position = 'absolute'
            hashIcon.style.top = `${rect.top + window.scrollY + 5}px`
            hashIcon.style.left = `${rect.left - 30}px`
          }
          setSelectedParagraphId(target?.id)
        }
      })
    })()
  }, [])

  const handleClick = async () => {
    const data = extractObjectUpToKey(paragraphs, selectedParagraphId || '')
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
