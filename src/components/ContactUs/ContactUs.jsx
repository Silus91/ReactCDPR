import React, { Component } from 'react';
import { connect } from 'react-redux'
import TextInput from '../TextInput/TextInput';
import { sendMessage } from '../../actions/uiActions';
import M from "materialize-css";

class ContactUs extends Component {

  state = {
    name: '',
    email: '',
    message: '',
    errors: {}
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
    event.preventDefault();
    const messageData = {
			name: this.state.name,
      email: this.state.email,
      message: this.state.message
    }
    this.props.sendMessage(messageData);
    this.setState({
      name: '',
      email: '',
      message: ''
    })
    event.target.reset();


  }

  render() {
    const { errors } = this.state;
    const { UI:{ loading } } = this.props;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <TextInput 
            id='name'
            type='text'
            label='Name'
            htmlFor='name'
            icon='account_circle'
            errors={errors.name ? errors.name : ''}
            onChange={this.handleChange}
          />
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
            id='message'
            type='text'
            htmlFor='message'
            label='Message'
            icon='message'
            errors={errors.message ? errors.message : ''}
            onChange={this.handleChange}
          />
          <span className="helper-text red-text center-align">{errors.general ? errors.general : ''}</span>
          <div className="input-field center-align">
            <button type="submit" className={loading ? "btn disabled" : "btn teal darken-2 z-depth-2" }>Send</button>
          </div>
        </form>
        {loading && (
        <div className="progress"><div className="indeterminate"></div></div>)} 
      </>   
    )
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI
})

export default connect(mapStateToProps, { sendMessage })(ContactUs);