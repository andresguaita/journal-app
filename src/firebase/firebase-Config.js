
import { getFirestore } from 'firebase/firestore'
import { GoogleAuthProvider } from 'firebase/auth'

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyDqoFioFsmR49szhDV0dIfYOHQYnYMxPYw',
  authDomain: 'journal-app-9abb5.firebaseapp.com',
  projectId: 'journal-app-9abb5',
  storageBucket: 'journal-app-9abb5.appspot.com',
  messagingSenderId: '656960574345',
  appId: '1:656960574345:web:548854cdf8175bddb60758'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

const db = getFirestore(app)

const googleAuthProvider = new GoogleAuthProvider()

export {
  db,
  googleAuthProvider,
  app
}
