import React, { Component } from 'react';
// import { connect } from 'react-redux'
import M from "materialize-css";

class Test extends Component {
  state = {
    email: '',
    password: ''
  }

  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
}

  handleChange = (event) => {
      console.log(event.target.value);
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.value);
  }
  render() {
    return (
      <div>
        <a className="waves-effect modal-trigger" href="#modal1">Login</a>
        <div id="modal1" className="modal">
          <div className="modal-content">
          <div className="container">
        <form className="white" onSubmit={this.handleSubmit}>
          <h5 className="grey-text text-darken-3">Login</h5>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input placeholder="Email" type="email" id='email' onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input placeholder="Password" type="password" id='password' onChange={this.handleChange} />
          </div>
          <div className="input-field">
          </div>
          </form>
        </div>
          </div>
          <div className="modal-footer">
          <button className="modal-close waves-effect btn pink lighten-1 z-depth-0">Login</button>

          </div>
        </div>
      </div>
    )
  }
}


export default Test;





