import React from 'react'
import { Link } from 'react-router-dom'

import Register from '../auth/Register'
import { authenticated } from '../../library/auth'

function Home () {
  return (
    <div className="hero-home">
      <h1>Villainously Monologues</h1>
      <h3>because the bad guys get all the good lines</h3>
      <br/>
      <div className='register-login'>
        {!authenticated() && <Register />}
        <div className="to-index">
          <Link to={'/quotes'}>
            <button>Just take me to the <br/>quotes already!</button>
          </Link>
        </div>
      </div>
      <img src={'https://i.pinimg.com/originals/f2/22/ef/f222ef942d0ed0aa04fd26acd6fd9b52.png'} alt='deadpool'/> 
    </div>
  )
}

export default Home