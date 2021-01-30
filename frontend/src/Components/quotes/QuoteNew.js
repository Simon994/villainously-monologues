import React from 'react'
import { Redirect } from 'react-router-dom'

import QuoteForm from './QuoteForm'
import { createQuote } from '../../library/api'

class QuoteNew extends React.Component{

  state = {
    formData: {
      quote: '', 
      name: '', 
      aliases: '',
      source: '', 
      image: '', 
      nemesis: '',
      quoteContext: '' 
    },
    redirect: null 
  }

  handleChange = (e) => {
    const formData = {
      ...this.state.formData,
      [e.target.name]: e.target.value
    }

    this.setState({
      formData
    })
  }

  handleSubmit = async (e) => {
    
    try {
      e.preventDefault()
      const res = await createQuote(this.state.formData)
      
      this.setState({
        redirect: `/quotes/${res.data._id}`
      })

    } catch (err){
      console.log(err.response)
      
    }


  }


  render(){
    if (this.state.redirect){
      return <Redirect to={this.state.redirect} />
    }
    
    return (
      <div>
        <QuoteForm formData={this.state.formData}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange} />
      </div>

    )
  }

}

export default QuoteNew