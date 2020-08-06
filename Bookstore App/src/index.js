import React from 'react';
import ReactDOM from 'react-dom';

import App from './App-component';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter as Router, Route} from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './index.css';
import Login from './components/login-component';
import Register from './components/register-component';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path = '/' component={App}></Route>
      <Route exact path = '/login' component={Login}></Route>
      <Route exact path = '/register' component={Register}></Route>
    </div>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
