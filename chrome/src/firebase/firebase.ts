import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBYiINkoPA7mUlqMMjzFuCENHSus5kigvU",
  authDomain: "coauthor-1a236.firebaseapp.com",
  databaseURL: "https://coauthor-1a236-default-rtdb.firebaseio.com",
  projectId: "coauthor-1a236",
  storageBucket: "coauthor-1a236.appspot.com",
  messagingSenderId: "341405035382",
  appId: "1:341405035382:web:3b368f032e659f54f1a857",
  measurementId: "G-8H4EMT90HK"
};
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const storage = getStorage(app)

export { auth, db, storage }
