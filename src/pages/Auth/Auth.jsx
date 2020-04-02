import React, { Component } from 'react';
import { connect } from 'react-redux';
import M from "materialize-css";
import Register from '../../components/Register/Register';
import Login from '../../components/Login/Login';
import './Auth.css';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { loginFbAction, loginGoogleAction } from '../../actions/authActions';

export class Auth extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div className="row authContainer">
        <div className="col s12 m6 offset-m3 l4 offset-l4">
          <div className="card authCard">
            <div className="card-content">
              <div>
                <ul className="tabs tabs-fixed-width">
                  <li className="tab"><a href="#login">Login</a></li>
                  <li className="tab"><a className="active" href="#register">Register</a></li>
                </ul>
              </div>
              <div className="card-content">
                <FacebookLoginButton onClick={() => this.props.loginFbAction()} />  
                <GoogleLoginButton onClick={() => this.props.loginGoogleAction()} />
              </div>
              <div>
                <div id="login"><Login /></div>
                <div id="register"><Register /></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapActionsToProps = {
  loginFbAction,
  loginGoogleAction,
}

export default connect(null, mapActionsToProps)(Auth);