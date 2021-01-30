
import React from 'react'
import { Redirect } from 'react-router-dom'

import { registerUser } from '../../library/auth'

class Register extends React.Component{

  state = {
    formData: {
      username: '',
      email: '',
      password: '',
      passwordConfirm: ''
    },
    errors: {

    },
    redirect: null
  }

  handleChange = (e) => {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }

    const errors = {
      ...this.state.errors,
      [e.target.name]: ''
    }

    this.setState({
      formData,
      errors
    })
  }

  handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await registerUser(this.state.formData)

      this.setState({
        redirect: '/login'
      })
      return
    } catch (err) {

      this.setState({
        errors: err.response.data.errors
      })
    }
  }

  render(){
    
    const { username,
      email,
      password,
      passwordConfirm 
    } = this.state.formData
    
    if (this.state.redirect){
      return <Redirect to={this.state.redirect} />
    }

    return (
      <section className='register-container'>
        <p>Register <br/><small>(for the really tasty features)</small></p>

        <form onSubmit={this.handleSubmit}>
          <label>username</label>
          <br/>
          <input 
            placeholder="username"
            name="username"
            value={username}
            onChange={this.handleChange} 
            className={this.state.errors.username ? 'error-highlight' : ''}
          >
          </input>
          {this.state.errors.username && <p className="error-explainer">username is required</p>}
          <br/>

          <label>email</label>
          <br/>
          <input 
            placeholder="email"
            name="email"
            value={email}
            onChange={this.handleChange} 
            className={this.state.errors.email ? 'problem-highlight' : ''}
          >
          </input>
          {this.state.errors.email && <p className="error-explainer">email is required</p>}
          <br/>
          
          <label>password</label>
          <br/>
          <input 
            placeholder="password"
            name="password"
            value={password}
            onChange={this.handleChange} 
            className={this.state.errors.password ? 'problem-highlight' : ''}
          >
          </input>
          {this.state.errors.password && <p className="error-explainer">password is required</p>}
          <br/>

          <label>password confirmation</label>
          <br/>
          <input 
            placeholder="Confirm your password"
            name="passwordConfirm"
            value={passwordConfirm}
            onChange={this.handleChange} 
            className={this.state.errors.passwordConfirm ? 'problem-highlight' : ''}
          >
          </input>
          {this.state.errors.passwordConfirm && <p className="error-explainer">password confirmation required</p>}

          <br/>
          <button type="submit">Register</button>
        
        </form> 

      </section>
    )
  }

}

export default Register