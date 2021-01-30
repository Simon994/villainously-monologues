import React from 'react'

import { Link } from 'react-router-dom'

const quoteStyle = {
  color: 'white',
  fontSize: '30px'
  // width: '20%'
  // marginBottom: '20%',
  // marginRight: '30%'
}

const nameStyle = {
  color: '#D44036'
  // marginTop: '50px'
}

const imgStyle = {
  marginTop: '50px',
  maxWidth: '500px',
  maxHeight: '400px'
}



const QuoteSlide = ({ _id, name, image, quote }) => {
  return (
    <Link to={`/quotes/${_id}`} style={{ textDecoration: 'none' }}>
      <div className='quote-card'>
        <div className='img-container' style={imgStyle}>
          <img src={image} className='character-img' alt='character'/>
        </div>
        <div className='card-text'>
          <h5 className='quote' style={quoteStyle}>{quote}</h5>
          <h5 style={nameStyle}>{name}</h5>
        </div>               
      </div>
    </ Link>
  )
}

export default QuoteSlide