import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";

export class Profile extends Component {

  renderRedirect = () => {
    if (!this.props.user.authenticated) {
      return <Redirect to='/' />
    }
  }
  
  render() {
    const { firstName, lastName, email, photoURL } = this.props.user.credentials;
    return (
      <div className="container row">
        {this.renderRedirect()}
        <h1>Profile</h1>
        <div className="card col l4 center">
          <div className="card-image">
            <img className="responsive-img" src={photoURL} />
          </div>
          <div className="card-stacked">
            <div className="card-content">
              <div>{`${firstName} ${lastName}`}</div>
              <div>{email}</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps)(Profile);
