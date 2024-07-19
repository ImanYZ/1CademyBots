interface Paragraph {
  id: string
  hash: string
  content: string
}
export const extractObjectUpToKey = (obj: Paragraph[], key: string) => {
  const extractedObject: Paragraph[] = []
  for (const objValue of obj) {
    extractedObject.push(objValue)
    if (objValue.id === key) {
      break
    }
  }
  return extractedObject.slice(-3)
}

export const getURL = () => {
  let url = new URL(window.location.href)
  return url.href
  let currentUrl = url.pathname.split('/').pop() || ''
  return currentUrl
}
