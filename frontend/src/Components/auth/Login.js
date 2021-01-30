import React from 'react'
import { Redirect } from 'react-router-dom'

import { loginUser, setToken } from '../../library/auth' 

class Login extends React.Component{

  state = {
    formData: {
      email: '',
      password: ''
    },

    errors: null,
    redirect: null
  }

  handleChange = (e) =>{
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }
    this.setState({ formData })
  } 


  handleSubmit = async (e) => {
    e.preventDefault()
   
    try {
      const res = await loginUser(this.state.formData)

      setToken(res.data.token)
      this.setState({
        redirect: '/quotes'
      })

    } catch (err){

      this.setState({
        errors: err.response.data
      })
    }
  }

  render(){
    const { email, password } = this.state.formData

    if (this.state.redirect){
      return <Redirect to={this.state.redirect} />
    }

    return (
      
      <section className="login-container">
        <p>Login to post or edit a quote</p>
        <form onSubmit={this.handleSubmit}>
          
          <label>email</label>
          <br/>
          <input 
            placeholder="email"
            name="email"
            value={email}
            onChange={this.handleChange} 
            className={this.state.errors ? 'error-highlight' : ''}
          >
          </input>
          <br/>

          <label>password</label>
          <br/>
          <input 
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange} 
            className={this.state.errors ? 'error-highlight' : ''}
          >
          </input>
          <br/>
          {this.state.errors && 
          <p style={{ fontSize: '15px', color: 'red' }}>
            Look's like there's a problem with your email and/or password
          </p>}
          <button type="submit">Login</button>
        </form>
        {/* <img src={'#'} /> */}
      </ section>
    )
  }
}

export default Login