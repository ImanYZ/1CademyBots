import { getAnalytics } from 'firebase/analytics'
import { getApps, initializeApp } from 'firebase/app'

export const initFirebaseClientSDK = () => {
  if (getApps.length <= 0) {
    initializeApp({
      apiKey: 'AIzaSyAyfoXvWQIsK1_BTzoTaPMPnBhjr6ZtZpY',
      authDomain: 'onecademy-dev.firebaseapp.com',
      databaseURL: 'https://onecademy-dev-default-rtdb.firebaseio.com',
      projectId: 'onecademy-dev',
      storageBucket: 'onecademy-dev.appspot.com',
      messagingSenderId: '735079871954',
      appId: '1:735079871954:web:d7de111435f188126e840b',
      measurementId: 'G-0CNKQJY7Y2',
    })
    if (typeof window !== 'undefined') {
      getAnalytics()
    }
  }
}

export const getFirebaseApp = () => {
  return getApps()[0]
}
