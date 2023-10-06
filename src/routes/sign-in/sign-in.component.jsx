import {createUserDocFromAuth, signInWithGooglePopUp} from "../../utils/firebase/firebase.utils"
import SignUpForm from "../../components/sign-up-form/sign-up-form.component"
import Button, {BUTTON_TYPE_CLASSES} from "../../components/button/button.component"

const SignIn = () => {
  const logGoogleUser = async () => {
    const {user} = await signInWithGooglePopUp()
    const userDocRef = await createUserDocFromAuth(user)
  }
  return (
    <>
      <h1>Hello</h1>
      <Button buttonType='google' onClick={logGoogleUser}>Sign in with Google</Button>
      <SignUpForm/>
    </>
  )
}

export default SignIn