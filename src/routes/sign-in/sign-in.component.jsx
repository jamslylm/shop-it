import {createUserDocFromAuth, signInWithGooglePopUp} from "../../utils/firebase/firebase.utils"

const SignIn = () => {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopUp()
    const userDocRef = await createUserDocFromAuth(user)
  }
  return (
    <>
      <h1>Hello</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </>
  )
}

export default SignIn