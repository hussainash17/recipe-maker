import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';

import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
});

const Root = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={App}></Route>
        <Route path='/signin' component={Signin}></Route>
        <Route path='/signup' component={Signup}></Route>
        <Redirect to='/'></Redirect>
      </Switch>
    </Router>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <Root></Root>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
