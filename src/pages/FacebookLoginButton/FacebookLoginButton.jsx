import React, { Component } from 'react'
import FacebookLogin from 'react-facebook-login';
import { loginFbAction } from '../../actions/authActions';
import { connect } from 'react-redux';

export class FacebookLoginButton extends Component {

  state = {
    userID: '',
    name: '',
    email: '',
    picture: ''
  }


  responseFacebook = response => {
    const user = {userID,name, email, picture};
    this.setState({
      userID: response.userID,
      name: response.name,
      email: response.email,
      picture: response.picture.data.url,
    })
  }

  componentClicked = () =>      this.props.loginFbAction(user, this.props.history);

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

const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  loginFbAction
}

export default connect(mapStateToProps,mapActionsToProps)(FacebookLoginButton);


// firebase.auth().onAuthStateChange(user => {
//   this.setState({ authorized: !!true})
// })
