import React from 'react'
import { Carousel } from 'react-responsive-carousel'

import { getAllQuotes } from '../../library/api'
import QuoteSlide from './QuoteSlide'

class QuotesIndex extends React.Component{

  state = {
    quotes: null
  }

  async componentDidMount(){
    const res = await getAllQuotes()
    this.setState({
      quotes: res.data
    })
  }

  render(){
    if (!this.state.quotes) return null
    return (
      <Carousel autoPlay="true" showThumbs={false}>
        { this.state.quotes
          .map((quote) => {
            return <QuoteSlide key={quote._id} {...quote} /> 
          }) 
        }
      </Carousel>
    )
  }

}


export default QuotesIndex