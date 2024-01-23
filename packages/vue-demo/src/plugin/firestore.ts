import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyClX00jZrYJYUx6-vCAsQnAMOZYJrrv8cw',
  authDomain: 'openbridge-demo.firebaseapp.com',
  projectId: 'openbridge-demo',
  storageBucket: 'openbridge-demo.appspot.com',
  messagingSenderId: '706186871273',
  appId: '1:706186871273:web:508b061405fa5339980b78'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
