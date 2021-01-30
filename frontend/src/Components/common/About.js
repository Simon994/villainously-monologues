import React from 'react'


function About () {
  return (
    <div className="hero-home about">
      <h1>About</h1>
      <h3>Villainously Monologues</h3>
      <br/>
      <p>Villainously Monologues is a full-stack MERN App with
        <br/> authenticated RESTful routes to get, create, update and delete
        <br/> quotes by comic book villains</p>
      <br/>
      <br/>
      <p>Build with 💕 by Simon</p>
      <br/>
      <p><small>Deadpool image credit: @davidlawyer</small></p>
       
      <img src={'https://i.pinimg.com/originals/f2/22/ef/f222ef942d0ed0aa04fd26acd6fd9b52.png'} alt='deadpool'/> 
    </div>
  )
}

export default About