import React, { Component } from 'react';
import { connect } from 'react-redux'
import M from "materialize-css";
import { loginAction } from '../../actions/authActions';
import { FacebookLoginButton, GoogleLoginButton } from "react-social-login-buttons";
import { loginFbAction, loginGoogleAction, loginTrialAction } from '../../actions/authActions';
import TextInput from '../../components/TextInput/TextInput';

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
              <TextInput 
                  id='email'
                  type='email'
                  label='Email'
                  for='email'
                  icon='email'
                  errors={errors.email ? errors.email : ''}
                  onChange={this.handleChange}
                />
                <TextInput 
                  id='password'
                  type='password'
                  for='password'
                  label='Password'
                  icon='security'
                  errors={errors.password ? errors.password : ''}
                  onChange={this.handleChange}
                  
                />
                <span className="helper-text red-text center-align">{errors.general ? errors.general : ''}</span>
                <div className="input-field center-align">
                  <button type="submit" className="btn teal darken-2 z-depth-2">Login</button>
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