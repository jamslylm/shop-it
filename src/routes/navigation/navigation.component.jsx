import {Fragment} from "react"
import {Link, Outlet} from "react-router-dom"

import {ReactComponent as ShopItLogo} from "../../assets/crown.svg"
import './navigation.styles.scss'

const Navigation = () => {
  return (
    <Fragment>
      <div className='navigation'>
        <Link to='/' className='logo-container'>
          <ShopItLogo className='logo'/>
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>Shop</Link>
          <Link className='nav-link' to='/sign-in'>Sign In</Link>
        </div>
      </div>
      <Outlet/>
    </Fragment>
  )
}

export default Navigation