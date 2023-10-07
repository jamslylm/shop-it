import {useState} from "react"
import {
  createUserDocFromAuth,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopUp,
} from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import './sign-in-form.styles.scss'
import Button from "../button/button.component"

const defaultFormFields  = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formField, setFormField] = useState(defaultFormFields)
  const {email, password} = formField

  const handleChange = ({target}) => {
    const {name, value} = target
    setFormField({...formField, [name]: value})
  }

  const resetFormFields = () => {
    setFormField(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    const {user} = await signInWithGooglePopUp()
    await createUserDocFromAuth(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const signedInUser = await signInAuthUserWithEmailAndPassword(email, password)
      console.log(signedInUser)
      resetFormFields()
    } catch (error) {
      if (error.code === 'auth/email-already-in-use'){
        return alert('Cannot create user, email already exists')
      }
      console.error(error)
    }
  }

  return (
    <div className={'sign-up-container'}>
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label={'Email'}
          type="email"
          name={'email'}
          value={email}
          onChange={handleChange}
          required/>

        <FormInput
          label={'Password'}
          type="password"
          name={'password'}
          value={password}
          onChange={handleChange}
          required/>

        <div className={'buttons-container'}>
          <Button type="submit">Sign in</Button>
          <Button buttonType='google' onClick={signInWithGoogle}>Google sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm