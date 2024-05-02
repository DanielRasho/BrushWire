import Proptypes from 'prop-types'
import ButtonImportant from '../atoms/ButtonImportant'
import ButtonSimple from '../atoms/ButtonSimple'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AUTH_CONTEXT } from '../../providers/auth'

export default function TopBar ({ navLinks = [] }) {
  const navigate = useNavigate()

  const isLogged = useContext(AUTH_CONTEXT).token !== ''

  const links = navLinks.map((navLink, index) => {
    return (
      <ButtonSimple key={index} onClick={navLink.onClick}>
        {' '}
        {navLink.content}{' '}
      </ButtonSimple>
    )
  })

  return (
    <>
      <nav className="topBar">
        <button onClick={() => navigate('/')}>
          <img src="brushWireLogo.png" alt="BrushWire Logo" />
        </button>
        <div className="search-bar">
          <input className="search-input" type="text" placeholder="Search" />
          <button className="search-submit" type="submit">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>

        {links}

        <LoginButtons isLogged={isLogged} />
      </nav>
    </>
  )
}

function LoginButtons ({ isLogged }) {
  const navigate = useNavigate()
  if (isLogged) {
    return (
      <ButtonImportant onClick={() => navigate('/user')}>
        <i className="fa-solid fa-arrow-right"></i>
        <span>Profile</span>
        <i className="fa-solid fa-arrow-right"></i>
      </ButtonImportant>
    )
  } else {
    return (
      <>
        <ButtonSimple onClick={() => navigate('/login')}>Login</ButtonSimple>
        <ButtonImportant onClick={() => navigate('/signup')}>
          <i className="fa-solid fa-arrow-right"></i>
          <span>Sign Up</span>
          <i className="fa-solid fa-arrow-right"></i>
        </ButtonImportant>
      </>
    )
  }
}

TopBar.propTypes = {
  navLinks: Proptypes.arrayOf(Proptypes.object)
}

LoginButtons.propTypes = {
  isLogged: Proptypes.bool
}
