import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home/Home';
import Cyberpunk from './pages/Cyberpunk/Cyberpunk';
import Witcher from './pages/Witcher/Witcher';
import './App.css';
import jwtDecode from 'jwt-decode';
import AuthRoute from './resources/AuthRoute';
import store from './store/root';
import axios from 'axios';
import { getUserData, logout } from './actions/authActions';
import Auth from './pages/Auth/Auth';

axios.create().get('http://localhost:5000/cdred-project/us-central1/api/user');

const token = localStorage.getItem("FBidToken");

if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logout());
    window.location.href = '/';
  } else {
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
} else {
  console.log("guest");
}

// Add a response interceptor
axios.create().interceptors.response.use(
  response => {
  return response;
}, error => {
console.error(error);
});

class App extends Component {
  render() {
    return (  
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path='/'component={Home} />
            <Route path='/cyberpunk' component={Cyberpunk} />
            <Route path='/witcher' component={Witcher} />
            <AuthRoute path='/auth' component={Auth} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
