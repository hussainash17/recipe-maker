import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './components/App';
import Navbar from './components/Navbar';
import withSession from './components/withSession';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Search from './components/Recipe/Search';
import AddRecipe from './components/Recipe/AddRecipe';
import RecipePage from './components/Recipe/RecipePage';
import Profile from './components/Profile/Profile';

// import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'http://localhost:4444/graphql',
  fetchOptions: {
    credentials: 'include',
  },
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      },
    });
  },
  onError: ({ networkError }) => {
    if (networkError) {
      localStorage.setItem("token", "");
    }
  },
});

const Root = ({ refetch, session }) => {
  return (
    <Router>
      <Fragment>
        <Navbar session={session} />
        <Switch>
          <Route path='/' exact component={App} />
          <Route path='/search' component={Search} />
          <Route path='/signin' render={() => <Signin refetch={refetch} />} />
          <Route path='/signup' render={() => <Signup refetch={refetch} />} />
          <Route
            path='/recipe/add'
            render={() => <AddRecipe session={session} />}
          />
          <Route path='/recipes/:_id' component={RecipePage} />
          <Route path='/profile' render={() => <Profile session={session} />} />
          <Redirect to='/' />
        </Switch>
      </Fragment>
    </Router>
  );
};

const RootWithSession = withSession(Root);

ReactDOM.render(
  <ApolloProvider client={client}>
    <RootWithSession />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
