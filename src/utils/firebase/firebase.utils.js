import {initializeApp} from 'firebase/app'
import {getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider} from 'firebase/auth'
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
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: 'select_account'
})

export const auth = getAuth()
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider)

export const db = getFirestore()
export const createUserDocFromAuth = async (authUser) => {
  const userDocRef = doc(db, 'users', authUser.uid)
  const userSnapshot = await getDoc(userDocRef)

  if (!userSnapshot.exists()){
    const {displayName, email} = authUser
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    }catch (error){
      console.error(`Error while creating the user:`, error.message)
    }
  }

  return userDocRef
}