import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom' 

import Nav from './Components/common/Nav'
import Home from './Components/common/Home'
import About from './Components/common/About'

import QuotesIndex from './Components/quotes/QuotesIndex'
import QuoteShow from './Components/quotes/QuoteShow'
import Register from './Components/auth/Register'
import Login from './Components/auth/Login'
import QuoteNew from './Components/quotes/QuoteNew'
import QuoteEdit from './Components/quotes/QuoteEdit'

const App = () => {

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path='/' component={Home} />

        <Route path='/quotes/new' component={QuoteNew} />
        <Route path='/quotes/:id/edit' component={QuoteEdit} />
        <Route path='/quotes/:id' component={QuoteShow} />
        <Route path='/quotes' component={QuotesIndex} /> 

        <Route path='/register' component={Register} />
        <Route path='/login' component={Login} />

        <Route path='/about' component={About} />
      </Switch>
    
    </BrowserRouter>


  )

}



export default App
