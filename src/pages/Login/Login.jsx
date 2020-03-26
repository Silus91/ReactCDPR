import React, { Component } from 'react';
import { connect } from 'react-redux'
import M from "materialize-css";
import { loginAction } from '../../actions/authActions';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { loginFbAction, loginGoogleAction, loginTrialAction } from '../../actions/authActions';

class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
        email: '',
        password: '',
        errors: {}
      }
  }

  componentDidMount() {
    M.AutoInit();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = (event) => {
    console.log(event);
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    }
    this.props.loginAction(userData, this.props.history)
  }

  render() {
    const { errors } = this.state;
    const { UI:{ loading } } = this.props;
    return (
      <div className="row">
        <div className="col s12 m6 offset-m3 l4 offset-l4">
          <div className="card z-depth-2">
            <div className="card-content">
              <h3 className="card-title center-align">Login</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="input-field">
                  <i className="material-icons prefix">email</i>
                  <label className="active" htmlFor="email">Email</label>
                  <input id="email" type="email" className="validate s12 l6" onChange={this.handleChange} />
                  <span className="helper-text red-text center-align">{errors.email? errors.email : ''}</span>
                </div>
                <div className="input-field">
                  <i className="material-icons prefix">lock</i>
                  <label className="active" htmlFor="password">Password</label>
                  <input type="password" id='password' className="validate" onChange={this.handleChange} />
                  <span className="helper-text red-text center-align">{errors.password ? errors.password : ''}</span>
                </div>
                <span className="helper-text red-text center-align">{errors.general ? errors.general : ''}</span>
                <div className="input-field center-align">
                  <button type="submit" className="btn pink lighten-1 z-depth-2">Login</button>
                </div>
              </form>
              {loading && (<div className="progress"><div className="indeterminate"></div></div>)} 
              <GoogleLoginButton onClick={() => this.props.loginTrialAction()} />

              <FacebookLoginButton onClick={ ()=> this.props.loginFbAction() } />  
              <GoogleLoginButton onClick={() => this.props.loginGoogleAction()} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  loginAction,
  loginFbAction,
  loginGoogleAction,
  loginTrialAction
}

export default connect(mapStateToProps, mapActionsToProps)(Login);