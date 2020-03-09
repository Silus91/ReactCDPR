import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loginFbAction } from '../../actions/authActions';
import app from '../Firebase/Firebase';

const firebase = require('firebase');

  

export class NewFbBut extends Component {


   login = ({ history }) => {
   
      const provider = new firebase.auth.FacebookAuthProvider(); 
      console.log("jestesm");
    
    
      app.auth().signInWithPopup(provider).then((res) => {
        const user = res.user;
    
        const credential = res.credential;
    
        console.log(user, credential)
      })
      .then(history.push('/'))
    
      
    
  
    }



  render() {

    return (
      <div>
        <button onClick={() => this.props.loginFbAction(this.props.history)}>
          FB login
        </button>
      </div>
    )
  }
}


export default connect(null, { loginFbAction })(NewFbBut)
