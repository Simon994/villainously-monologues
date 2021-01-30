import React from 'react'
import { Redirect } from 'react-router-dom'

import QuoteForm from './QuoteForm'
import { getSingleQuote, updateQuote } from '../../library/api'


class QuoteEdit extends React.Component{

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


  async componentDidMount(){
    const res = await getSingleQuote(this.props.match.params.id)
    this.setState({
      formData: res.data
    })
  }

  componentWillUnmount(){
    
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
      const id = this.props.match.params.id
      await updateQuote(id, this.state.formData)

      this.setState({
        redirect: `quotes/${id}`
      })
    } catch (err){
      console.log(err)
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

export default QuoteEdit