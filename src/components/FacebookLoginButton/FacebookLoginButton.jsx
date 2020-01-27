import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';

export class FacebookLoginButton extends Component {

  state = {
    isLoggedIn:false,
    userID: '',
    name: '',
    email: '',
    picture: ''
  }

  responseFacebook = response => {
    this.setState({
      isLoggedIn: true,
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url
    })
  }

  componentClicked = () =>  console.log("clicked");

  render() {
    let fbContent;

    if(this.state.isLoggedIn) {
      fbContent = (
        <div className="teal">
          <img src={this.state.picture}  alt={this.state.name} />
          <h2>Welcome {this.state.name}</h2>
          <h3>{this.state.email}</h3>
        </div>
      )
    } else {
      fbContent = (<FacebookLogin
        appId="689288051477072"
        autoLoad={true}
        fields="name,email,picture"
        onClick={this.componentClicked}
        callback={this.responseFacebook} />)
    }
    return (
      <div>
        {fbContent}
      </div>
    )
  }
}

export default FacebookLoginButton;
