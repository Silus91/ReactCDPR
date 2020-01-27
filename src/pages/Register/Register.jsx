import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerAction } from '../../actions/authActions';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      handle: '',
      errors: {},
    }
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
    const { email, password, confirmPassword, firstName, lastName, handle} = this.state;
    event.preventDefault();
    this.setState({
      loading: true
    });
    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      firstName: firstName,
      lastName: lastName,
      handle: handle
    };
    this.props.registerAction(newUserData, this.props.history)
  };

  render() {
    const { UI:{ loading } } = this.props;
    const { errors } = this.state;
    return (
      <div className="row">
        <div className="col s12 m6 offset-m3 l4 offset-l4">
          <div className="card z-depth-2">
            <div className="card-content">
              <h3 className="card-title center-align">Register</h3>
              <form onSubmit={this.handleSubmit}>
                <div className="input-field">
                  <i className="material-icons prefix">email</i>
                  <label htmlFor="email">Email</label>
                  <input id="email" type="email" className="validate" onChange={this.handleChange} />
                  <span className="helper-text red-text center-align">{errors.email ? errors.email : ''}</span>
                </div>
                <div className="input-field">
                  <i className="material-icons prefix">security</i>
                  <label htmlFor="password">Password</label>
                  <input type="password" id='password' className="validate" onChange={this.handleChange} />
                  <span className="helper-text red-text center-align">{errors.password? errors.password : ''}</span>
                </div>
                <div className="input-field">
                  <i className="material-icons prefix">security</i>
                  <label htmlFor="Confirm password">Confirm Password</label>
                  <input type="password" id='confirmPassword' className="validate" onChange={this.handleChange} />
                  <span className="helper-text red-text center-align">{errors.confirmPassword ? errors.confirmPassword : ''}</span>
                </div>
                <div className="input-field">
                  <i className="material-icons prefix">account_circle</i>
                  <label htmlFor="firstName">First Name</label>
                  <input type="text" id='firstName' className="validate" onChange={this.handleChange} />
                  <span className="helper-text red-text center-align">{errors.firstName ? errors.firstName : ''}</span>
                </div>
                <div className="input-field">
                  <i className="material-icons prefix">account_circle</i>
                  <label htmlFor="lastName">Last Name</label>
                  <input type="text" id='lastName' className="validate" onChange={this.handleChange} />
                  <span className="helper-text red-text center-align">{errors.lastName? errors.lastName : ''}</span>
                </div>
                <div className="input-field">
                  <i className="material-icons prefix">fingerprint</i>
                  <label htmlFor="handle">Nick Name</label>
                  <input type="text" id='handle' className="validate" onChange={this.handleChange} />
                  <span className="helper-text red-text center-align">{errors.handle ? errors.handle : ''}</span>
                </div>
                <span className="helper-text red-text center-align">{errors.general ? errors.general : ''}</span>
                <div className="input-field">
                  <button type="submit" className="btn pink lighten-1 z-depth-2 center-align">Sign Up</button>
                </div>
              </form>
              {loading && (<div class="progress"><div class="indeterminate"></div></div>)}  
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user,
    UI: state.UI

  }
}

export default connect(mapStateToProps, { registerAction })(Register);
