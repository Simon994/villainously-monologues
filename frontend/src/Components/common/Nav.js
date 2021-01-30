
import React from 'react'
import { NavLink, Link, withRouter } from 'react-router-dom'

import { logout, authenticated } from '../../library/auth'

function handleLogout(){
  logout()
}

function Nav() {
  return (

    <nav className='nav'>
      <div className="nav-open">
        <NavLink exact to={'/'} 
          activeStyle={{ color: 'black' }}
          className='link'>
          <span>Home</span>
        </NavLink>

        <NavLink exact to={'/quotes'} 
          activeStyle={{ color: 'black' }}
          className='link'>
          <span>Quotes</span>
        </NavLink>

        {!authenticated() &&
          <NavLink to={'/login'} 
            activeStyle={{ color: 'black' }}
            className='link'>
            <span>Login</span>
          </NavLink>
        }
      </div>

      <div className="nav-members">
        {authenticated() &&
        <Link to='/' onClick={handleLogout} className='link' id='logout'>
          <span>Logout</span>
        </Link>
        }
        {authenticated() &&
          <NavLink to="/quotes/new"
            activeStyle={{ color: 'black' }}
            className='link'
            id='add-quote'>
            <span>Add a quote</span>
          </NavLink>
        }

        <NavLink to={'/about'} 
          activeStyle={{ color: 'black' }}
          className='link'>
          <span>About</span>
        </NavLink>
      </div>


    </nav>

  )
}

export default withRouter(Nav)
