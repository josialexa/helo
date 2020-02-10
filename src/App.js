import React from 'react';
import {withRouter} from 'react-router-dom'
import Nav from './components/Nav/Nav'
import routes from './routes'

import './App.css';

function App(props) {
  return (
    <div className="App">
      {props.location.pathname == '/' ? null : <Nav />}
      {routes}
    </div>
  );
}

export default withRouter(App);
