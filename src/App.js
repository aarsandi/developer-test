import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './scss/index.css';
import Home from './views/Home'
import Login from './views/Login'
import PositionSingle from './views/PositionSingle'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route exact path="/position/:id">
            <PositionSingle/>
          </Route>
          <Route exact path="/login">
            <Login/>
          </Route>
          <Route path="*">
            <h1>not found!</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
