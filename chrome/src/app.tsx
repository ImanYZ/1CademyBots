import React from 'react'
import { createRoot } from 'react-dom/client'
import Main from './Main'

let container = document.getElementById('1coauthor')
if (!container) {
  container = document.createElement('div')
  container.setAttribute('id', '1coauthor')
  document.body.appendChild(container)
}

const root = createRoot(container)
console.log("Appppp")
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
)
