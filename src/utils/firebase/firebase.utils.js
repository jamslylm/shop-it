import {initializeApp} from 'firebase/app'
import {getAuth, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore, getDoc, setDoc, doc} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBIKLor6YWWcGWasO_iccdB5GRDprnIqnU",
  authDomain: "shopit-42a4c.firebaseapp.com",
  projectId: "shopit-42a4c",
  storageBucket: "shopit-42a4c.appspot.com",
  messagingSenderId: "13443846531",
  appId: "1:13443846531:web:e39c4fbf47278a81e9e6b6",
  measurementId: "G-YBSDEKBCPQ"
};

// Initialize Firebase
// eslint-disable-next-line no-unused-vars
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider)

export const db = getFirestore()
export const createUserDocFromAuth = async (authUser, additionalInformation = {}) => {
  if (!authUser) return
  const userDocRef = doc(db, 'users', authUser.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()){
    const {displayName, email} = authUser
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    }catch (error){
      console.error(`Error while creating the user:`, error.message)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}