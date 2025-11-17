import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const {history} = props
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  const clickImage = () => history.replace('/')
  return (
    <nav className="headerClass">
      <ul className="nav-menu">
        <li className="listStyle">
          <Link to="/" className="nav-link">
            <img
              className="website-Logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              onClick={clickImage}
            />
          </Link>
        </li>
        <li className="data-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </li>

        <li>
          {' '}
          <button
            type="button"
            className="logout-desktop-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
