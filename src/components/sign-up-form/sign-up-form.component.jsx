import {useState} from "react"
import {createAuthUserWithEmailAndPassword, createUserDocFromAuth} from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import './sign-up-form.styles.scss'
import Button from "../button/button.component"

const defaultFormFields  = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formField, setFormField] = useState(defaultFormFields)
  const {displayName, email, password, confirmPassword} = formField

  const handleChange = ({target}) => {
    const {name, value} = target
    setFormField({...formField, [name]: value})
  }

  const resetFormFields = () => {
    setFormField(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const isPasswordMatched = confirmPassword === password

    if (!isPasswordMatched) return

    try {
      const createdUser = await createAuthUserWithEmailAndPassword(email, password)
      const {user} = createdUser
      await createUserDocFromAuth(user, {displayName})
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
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput label={'Display Name'} type="text" name={'displayName'} value={displayName} onChange={handleChange} required/>

        <FormInput label={'Email'} type="email" name={'email'} value={email} onChange={handleChange} required/>

        <FormInput label={'Password'} type="password" name={'password'} value={password} onChange={handleChange} required/>

        <FormInput label={'Confirm Password'} type="password" name={'confirmPassword'} value={confirmPassword} onChange={handleChange} required/>

        <Button type="submit">Sign up</Button>
      </form>
    </div>
  )
}

export default SignUpForm