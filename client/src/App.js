import React from 'react';
import Game from './Game'
import Home from './Home'
import {BrowserRouter, Route, Redirect} from 'react-router-dom'
const App = () => {
  return (
    <BrowserRouter basename="/ulartangga">
      <Route path="/" exact component={Home}/>
      <Route path="/create"  render={()=>{
        return <Redirect to={`/room/${Date.now()}`}/>
      }}/>
      <Route path="/room/:id" component={Game}/>
    </BrowserRouter>
  )
}
 
export default App;