interface Paragraph {
  id: string
  hash: string
  content: string
}
const createNewTab = async (message: {
  action: string
  url: string
  data: Paragraph[]
}) => {
  console.log(message, 'message')
  console.log(message.data, 'data')
  //return

  // const idTokenResult = await user.getIdTokenResult()
  //   const token = idTokenResult.token
  //   const headers: any = {
  //     'Content-Type': 'application/json',
  //   }
  //   if (token) {
  //     headers['Authorization'] = `Bearer ${token}`
  //   }
  //   const res = await fetch(`${ENDPOINT_BASE}/getCostumToken`, {
  //     method: 'POST',
  //     headers,
  //   })
  //   const { customToken } = await res.json()

  // const tabs = await chrome.tabs.query({
  //   url: message.url,
  // })

  // if (tabs.length === 0) {
  //   chrome.tabs.create({ url: message.url })
  // } else {
  //   chrome.tabs.update(tabs[0].id || 0, {
  //     active: true,
  //   })
  // }
}

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === 'createNewTab') {
    createNewTab(message)
  }
})
