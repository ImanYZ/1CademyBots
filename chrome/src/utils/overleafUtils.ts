import { tokenizeAndCount, calculateCosineSimilarity } from './cosineSimilarity'

// const simulateSelectAll = (pageContent: any) => {
//   pageContent.focus()
//   if (navigator.userAgent.includes('Mac')) {
//     pageContent.dispatchEvent(
//       new KeyboardEvent('keydown', { metaKey: true, key: 'a' })
//     )
//   } else {
//     pageContent.dispatchEvent(
//       new KeyboardEvent('keydown', { ctrlKey: true, key: 'a' })
//     )
//   }
// }

export const getProjectId = () => {
  const url: any = window.location.href
  const projectId = url?.match(/project\/(\w+)/)[1] || ''
  return projectId
}

const waitForContent = async () => {
  return new Promise((resolve) => {
    const checkContent = () => {
      const pageContent = document.getElementsByClassName(
        'cm-content cm-lineWrapping'
      )[0]
      if (!pageContent) {
        console.log('Waiting for page content to load...')
        setTimeout(checkContent, 1000)
      } else {
        resolve(pageContent)
      }
    }
    checkContent()
  })
}

const waitForDivs = (pageContent: any) => {
  return new Promise((resolve) => {
    const checkDivs = () => {
      const visibleDIVs = pageContent.getElementsByTagName('div')
      if (visibleDIVs.length === 0) {
        console.log('DIVs not found, waiting...')
        setTimeout(checkDivs, 1000)
      } else {
        resolve(visibleDIVs)
      }
    }
    checkDivs()
  })
}

const scrollToTopDIV = async (
  allDIVs: HTMLDivElement[],
  waitingTime: number,
  hitsNum: number
): Promise<{
  pageContent: any
  allDIVs: HTMLDivElement[]
}> => {
  let pageContent = (await waitForContent()) as HTMLElement
  let visibleDIVs: HTMLCollectionOf<HTMLDivElement> = (await waitForDivs(
    pageContent
  )) as HTMLCollectionOf<HTMLDivElement>

  // Scroll to the top div in allDIVs
  const topDiv = visibleDIVs[0]
  if (topDiv) {
    topDiv.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }
  await new Promise((r) => setTimeout(r, waitingTime)) // Wait for potential loading
  pageContent = (await waitForContent()) as HTMLElement
  visibleDIVs = (await waitForDivs(
    pageContent
  )) as HTMLCollectionOf<HTMLDivElement>

  let noDIVAdded = true
  for (let i = visibleDIVs.length - 1; i > 0; i--) {
    if (
      visibleDIVs[i].textContent?.trimEnd() &&
      allDIVs.findIndex(
        (div) => div.textContent === visibleDIVs[i].textContent
      ) === -1
    ) {
      allDIVs.push(visibleDIVs[i])
      noDIVAdded = false
    }
  }
  if (noDIVAdded) {
    hitsNum++
  } else {
    hitsNum = 0
  }
  if (noDIVAdded && hitsNum === 4) {
    return { pageContent, allDIVs }
  } else {
    return await scrollToTopDIV(Array.from(visibleDIVs), waitingTime, hitsNum)
  }
}

const getAllContent = async (
  allDIVs: HTMLDivElement[],
  waitingTime: number,
  hitsNum: number
): Promise<{
  pageContent: any
  allDIVs: HTMLDivElement[]
  allContent: string
}> => {
  let pageContent = (await waitForContent()) as HTMLElement
  let visibleDIVs: HTMLCollectionOf<HTMLDivElement> = (await waitForDivs(
    pageContent
  )) as HTMLCollectionOf<HTMLDivElement>

  if (visibleDIVs.length > 0) {
    // Scroll to the last div in allDIVs
    const lastDiv = visibleDIVs[visibleDIVs.length - 1]
    if (lastDiv) {
      lastDiv.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }
  await new Promise((r) => setTimeout(r, waitingTime)) // Wait for potential loading
  pageContent = (await waitForContent()) as HTMLElement
  visibleDIVs = (await waitForDivs(
    pageContent
  )) as HTMLCollectionOf<HTMLDivElement>

  let noDIVAdded = true
  for (let i = 0; i < visibleDIVs.length; i++) {
    if (
      visibleDIVs[i].textContent?.trimEnd() &&
      allDIVs.findIndex(
        (div) => div.textContent === visibleDIVs[i].textContent
      ) === -1
    ) {
      allDIVs.push(visibleDIVs[i])
      noDIVAdded = false
    }
  }
  if (noDIVAdded) {
    hitsNum++
  } else {
    hitsNum = 0
  }
  if (noDIVAdded && hitsNum === 4) {
    const allContent = allDIVs.reduce(
      (acc, currentDiv) => acc + '\n' + currentDiv.textContent,
      ''
    )
    return { pageContent, allDIVs, allContent }
  } else {
    return await getAllContent(allDIVs, waitingTime, hitsNum)
  }
}

export const getOverleafContent = async (): Promise<{
  pageContent: any
  allDIVs: HTMLDivElement[]
  allContent: string
}> => {
  const element = document.getElementById('scrolling-overlay')
  if (element) {
    element.style.display = 'flex'
  }
  await scrollToTopDIV([], 700, 0)
  const returnVal = await getAllContent([], 700, 0)
  if (element) {
    element.style.display = 'none'
  }
  return returnVal
}

const ScrollToTheFirstSearchResult = (searchResult: Element) => {
  console.log('scrolling the whole content .....')
  // const element = document.getElementById('scrolling-overlay')
  // if (element) {
  //   element.style.display = 'flex'
  // }
  searchResult.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  })
  // setTimeout(() => {
  //   if (element) {
  //     element.style.display = 'none'
  //   }
  // }, 4000)
}

export const findInContent = async (text: string) => {
  //   const { pageContent, allDIVs, allContent } = await getOverleafContent()
  //   if (allContent) {
  const pageContent: any = (await waitForContent()) as HTMLElement
  if (navigator.userAgent.includes('Mac')) {
    pageContent.dispatchEvent(
      new KeyboardEvent('keydown', { metaKey: true, key: 'f' })
    )
  } else {
    pageContent.dispatchEvent(
      new KeyboardEvent('keydown', { ctrlKey: true, key: 'f' })
    )
  }
  let searchBox = document.getElementsByName('search')[0] as HTMLInputElement
  return new Promise((resolve) => {
    if (searchBox) {
      searchBox.focus()
      searchBox.value = text
      searchBox.dispatchEvent(new Event('input', { bubbles: true }))
      dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
      setTimeout(() => {
        let searchResults = document.getElementsByClassName(
          'cm-searchMatch cm-searchMatch-selected'
        )
        if (searchResults.length === 0) {
          searchBox.focus()
          searchBox.value = text
          searchBox.dispatchEvent(new Event('input', { bubbles: true }))
          dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }))
          setTimeout(() => {
            searchResults = document.getElementsByClassName(
              'cm-searchMatch cm-searchMatch-selected'
            )
            if (searchResults.length === 0) {
              resolve(null)
            } else {
              ScrollToTheFirstSearchResult(searchResults[0])
              resolve(searchResults[0])
            }
          }, 1000)
        } else {
          ScrollToTheFirstSearchResult(searchResults[0])
          resolve(searchResults[0])
        }
      }, 1000)
    }
  })
  //   }
}

// export const findScrollAndSelect = async (text: string) => {
//   const { allDIVs } = await getOverleafContent()
//   let matchingElement: any = null
//   let maxSimilarity = -Infinity

//   if (text) {
//     const vec1 = tokenizeAndCount(text)
//     for (let i = 0; i < allDIVs.length; i++) {
//       const currentDiv = allDIVs[i]
//       if (currentDiv?.textContent) {
//         const vec2 = tokenizeAndCount(currentDiv.textContent)
//         const similarity = calculateCosineSimilarity(vec1, vec2)
//         if (similarity > maxSimilarity) {
//           maxSimilarity = similarity
//           matchingElement = currentDiv
//         }
//       }
//     }
//   }
//   console.log('matchingElement: ', matchingElement.textContent)
//   if (matchingElement) {
//     matchingElement.scrollIntoView({
//       behavior: 'smooth',
//       block: 'center',
//     })
//     matchingElement.style.backgroundColor = '#573800'
//     return matchingElement
//   }
//   return null
// }
