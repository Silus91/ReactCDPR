import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginFbAction } from '../../actions/authActions';


export class NewFbBut extends Component {

  render() {
    return (
      <div>
        <button onClick={() =>this.props.loginFbAction(this.props.history)}>
          FB login
        </button>
      </div>
    )
  }
}


export default connect(null, { loginFbAction })(NewFbBut)
