import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginFbAction } from '../../actions/authActions';
import app from '../Firebase/Firebase';
const firebase = require('firebase');

export class NewFbBut extends Component {

  login = () => {
    console.log("dawaj kurwa")
      const provider = new firebase.auth.FacebookAuthProvider(); 
      console.log("jestesm");
    
    
    app.auth().signInWithPopup(provider).then((res) => {
      const user = res.user;
    
      const credential = res.credential;
    
      console.log(user, credential);
      return;
      }) 
    }

  render() {
    return (
      <div>
        <button onClick={() =>this.login()}>
          FB login
        </button>
      </div>
    )
  }
}


export default connect(null, { loginFbAction })(NewFbBut)
