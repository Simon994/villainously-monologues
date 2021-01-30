import React from 'react'
import { Link, Redirect } from 'react-router-dom'

import { getSingleQuote, deleteQuote } from '../../library/api'
import { authenticated } from '../../library/auth'

class QuoteShow extends React.Component{

  state = {
    quote: null,
    redirect: null,
    editDeleteAllow: null
  }

  async componentDidMount(){
    const quoteId = this.props.match.params.id
    
    const res = await getSingleQuote(quoteId)

    this.setState({
      quote: res.data.foundVillain,
      editDeleteAllow: res.data.editDeleteAllow
    })
    
  }


  handleDelete = async () => {
    await deleteQuote(this.props.match.params.id)

    this.setState({
      redirect: '/quotes'
    })
  }


  render(){
    
    const { quote } = this.state
    
    if (this.state.redirect){
      return <Redirect to={this.state.redirect} />
    }
    
    if (!quote) return <h1>Getting this show on the road!</h1>
    return (
      <div className='showdetail-container'>
        
        <div className='show-img'
          style={{ backgroundImage: `url(${quote.image})` }}>
        </div>

        <div className='show-text'>
          <h3>Quote:<br/>
            <span>{ quote.quote}</span>
          </h3>
          
          <h3>By:<br/>
            <span>{ quote.name}</span>
          </h3>
          
          <h3>Aliases:<br/>
            <span>{ quote.aliases.map((alias, i) => {
              return <p key={i}>{alias}</p>
            })}
            </span>
          </h3>
          
          <h3>Source:<br/>
            <span>{ quote.source}</span>
          </h3>
          
          <h3>Nemesis:<br/>
            <span>{ quote.nemesis}</span>
          </h3>

          {quote.quoteContext && 
          <h3>Quote context:<br/>
            <span>{ quote.quoteContext }</span>
          </h3>
          }

          <h3>Posted by:<br/>
            <span>{ quote.owner.username }</span>
          </h3>


          {authenticated() && this.state.editDeleteAllow &&
          <div className='edit-delete'> 
            <button className="edit"><Link to={`/quotes/${quote._id}/edit`} className='edit'>Edit</Link></button>
            <button onClick={this.handleDelete} className="delete">Delete</button>
          </div>
          }
        </div>
        
      </div>
    )
  }

}

export default QuoteShow