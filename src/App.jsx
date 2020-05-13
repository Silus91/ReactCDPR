import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import Cdproject from "./pages/Cdproject/Cdproject";
import Navbar from "./layout/Navbar";
import Home from "./pages/Home/Home";
import Cyberpunk from "./pages/Cyberpunk/Cyberpunk";
import Witcher from "./pages/Witcher/Witcher";
import Footer from "./layout/Footer";
import Loader from "./components/Loader/Loader";
import Profile from "./pages/Profile/Profile";
import "./App.css";
import jwtDecode from "jwt-decode";
import AuthRoute from "./services/AuthRoute";
import store from "./store/root";
import axios from "axios";
import { getUserData, logout } from "./actions/authActions";
import * as Sentry from "@sentry/browser";

Sentry.init({ dsn: process.env.REACT_APP_SENTRY_DSN });

const token = localStorage.getItem("FBidToken");
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("FBidToken");
    store.dispatch(logout());
    window.location.href = "/";
  } else {
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

axios.create().interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error(error);
  }
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Loader />
        <Navbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/cdproject' component={Cdproject} />
          <Route path='/cyberpunk' component={Cyberpunk} />
          <Route path='/witcher' component={Witcher} />
          <Route path='/profile' component={Profile} />
          <AuthRoute path='/auth' component={Auth} />
        </Switch>
        <Footer />
      </BrowserRouter>
    );
  }
}

export default App;
