interface ParagraphProp {
  hash: string
  content: string
}
interface Paragraph {
  [key: string]: ParagraphProp
}

const createNewTab = (message: {
  action: string
  url: string
  data: Paragraph
}) => {
  console.log(message.data, "data")
  return
  chrome.tabs.create({ url: message.url })
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'createNewTab') {
    createNewTab(message)
  }
})
