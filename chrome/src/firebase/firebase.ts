import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const app = initializeApp({
  apiKey: 'AIzaSyAyfoXvWQIsK1_BTzoTaPMPnBhjr6ZtZpY',
  authDomain: 'onecademy-dev.firebaseapp.com',
  databaseURL: 'https://onecademy-dev-default-rtdb.firebaseio.com',
  projectId: 'onecademy-dev',
  storageBucket: 'onecademy-dev.appspot.com',
  messagingSenderId: '735079871954',
  appId: '1:735079871954:web:d7de111435f188126e840b',
  measurementId: 'G-0CNKQJY7Y2',
})

const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }
