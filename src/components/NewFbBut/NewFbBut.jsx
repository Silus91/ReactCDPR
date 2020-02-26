import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginFbAction } from '../../actions/authActions';

export class NewFbBut extends Component {



  clickFunc() {
    console.log("dawaj");

    this.props.loginFbAction()

  }


  render() {

    return (
      <div>
        <button onClick={() => this.props.loginFbAction()}>
          FB login
        </button>
      </div>
    )
  }
}


export default connect(null, { loginFbAction })(NewFbBut)
