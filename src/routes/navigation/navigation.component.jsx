import {Fragment, useContext} from "react"
import {Link, Outlet} from "react-router-dom"

import {ReactComponent as ShopItLogo} from "../../assets/crown.svg"
import './navigation.styles.scss'
import {UserContext} from "../../contexts/user.context"
import {signOutUser} from "../../utils/firebase/firebase.utils"

const Navigation = () => {
  const {currentUser} = useContext(UserContext)

  const signOutHandler = async () => {
    await signOutUser()
  }
  return (
    <Fragment>
      <div className='navigation'>
        <Link to='/' className='logo-container'>
          <ShopItLogo className='logo'/>
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>Shop</Link>
          {
            currentUser ? (
              <span className='nav-link' onClick={signOutHandler}>Sign Out</span>
            ) : (<Link className='nav-link' to='/auth'>Sign In</Link>)
          }
        </div>
      </div>
      <Outlet/>
    </Fragment>
  )
}

export default Navigation