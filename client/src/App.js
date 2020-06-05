import React from 'react';
import Game from './Game'
import Home from './Home'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
const App = () => {
  return (
    <BrowserRouter>
      <Route path="/" component={Home}/>
      <Route path="/create"  render={()=>{
        return <Redirect to={`/${Date.now()}`}/>
      }}/>
      <Route path="/:id" component={Game}/>
    </BrowserRouter>
  )
}
 
export default App;