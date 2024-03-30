interface ParagraphProp {
  hash: string
  content: string
}
interface Paragraph {
  [key: string]: ParagraphProp
}

export const extractObjectUpToKey = (obj: Paragraph, key: string) => {
  const extractedObject = {} as Paragraph
  for (const objKey in obj) {
    extractedObject[objKey] = obj[objKey]
    if (objKey === key) {
      break
    }
  }
  return extractedObject
}

export const getURL = () => {
  let url = new URL(window.location.href)
  let currentUrl = url.pathname.split('/').pop() || ''
  return currentUrl
}
