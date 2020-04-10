import React, { Component } from 'react';
import { connect } from 'react-redux';
import { registerAction } from '../../actions/authActions';
import TextInput from '../TextInput/TextInput';
import M from "materialize-css";


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
      photoURL: '1'
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
    const { email, password, confirmPassword, firstName, lastName} = this.state;
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
      photoURL: lastName
    };
    this.props.registerAction(newUserData, this.props.history)
  };

  render() {
    const { UI:{ loading } } = this.props;
    const { errors } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <TextInput 
            id='email'
            type='email'
            label='Email'
            htmlFor='email'
            icon='email'
            errors={errors.email ? errors.email : ''}
            onChange={this.handleChange}
          />
          <TextInput 
            id='password'
            type='password'
            htmlFor='password'
            label='Password'
            icon='security'
            errors={errors.password ? errors.password : ''}
            onChange={this.handleChange}
          />
          <TextInput 
            id='confirmPassword'
            type='password'
            label='Confirm Password'
            htmlFor='Confirm password'
            icon='security'
            errors={errors.confirmPassword ? errors.confirmPassword : ''}
            onChange={this.handleChange}
          />
          <TextInput 
            id='firstName'
            type='text'
            label='First Name'
            icon='account_circle'
            htmlFor='First name'
            errors={errors.firstName ? errors.firstName : ''}
            onChange={this.handleChange}
          />
          <TextInput 
            id='lastName'
            type='text'
            label='Last Name'
            htmlFor='lastName'
            icon='account_circle'
            errors={errors.lastName ? errors.lastName : ''}
            onChange={this.handleChange}
          />
          <span className="helper-text red-text center-align">{errors.general ? errors.general : ''}</span>
          <div className="input-field center-align">
            <button type="submit" className={loading ? "btn disabled": "btn teal darken-2 z-depth-2" }>Register</button>
          </div>
        </form>
        {loading && (<div className="progress"><div className="indeterminate"></div></div>)}  
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

export default connect(mapStateToProps, { registerAction } )(Register);
