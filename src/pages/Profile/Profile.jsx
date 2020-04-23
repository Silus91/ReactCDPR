import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { uploadUserImg } from '../../actions/authActions';
import storage from '../../resources/Firebase/FirebaseStorage';
import firebase from '../../resources/Firebase/Firebase';


export class Profile extends Component {

  renderRedirect = () => {
    if (!this.props.user.authenticated) {
      return <Redirect to='/' />
    }
  }

  handleImageChange = (event) => {
    const image = event.target.files[0]
    const storageRef = firebase.storage().ref('userImgs/' + image.name);
    const task = storageRef.put(image);
    task.on(
      'state_changed',
      function progress(snapshot) {
        console.log(snapshot)
      },
      function error(err) {
        console.log(err)
      },
      function complete() {

      }
    )
  }

  render() {
    const { firstName, lastName, email, photoURL } = this.props.user.credentials;
    return (
      <div className="container row">
        {this.renderRedirect()}
        <h1>Profile</h1>
        <div className="card col l4">
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
        <div className="card col l6">
          <div className="card-content">
            <div className="file-field input-field">
              <div className="btn">
                <span>Img</span>
                <input type="file" onChange={this.handleImageChange} />
              </div>
              <div className="file-path-wrapper">
                <input className="file-path validate" type="text" placeholder="Upload your profile Img" />
              </div>
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

export default connect(mapStateToProps, { uploadUserImg })(Profile);




    // const formData = new FormData();
    // formData.append('image', image, image.name);
    // this.props.uploadUserImg(formData);
    // console.log(formData.append)