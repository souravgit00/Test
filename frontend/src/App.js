import React from 'react'
import { BrowserRouter, NavLink, Route, Switch } from 'react-router-dom'
import './App.css';

import Home from './components/home/home'
import Users from './components/users/users'
import Todo from './components/todo/todo'

function App() {
  return (
    <BrowserRouter>
        <header>
          <NavLink to="/" exact>Home</NavLink> &nbsp;&nbsp;&nbsp;
          <NavLink to="/users">Users</NavLink>
        </header>

        <Switch>
          <Route path="/" exact>
            <Home/>
          </Route>
          <Route path="/users/:userId">
            <Todo/>
          </Route>
          <Route path="/users">
            <Users/>
          </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
