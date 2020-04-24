import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { uploadUserImg } from '../../actions/authActions';
import './Profile.css';
import M from "materialize-css";

export class Profile extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  renderRedirect = () => {
    if (!this.props.user.authenticated) {
      return <Redirect to='/' />
    }
  }

  handleImageChange = (event) => {
    const image = event.target.files[0];
    const formData = new FormData();
    formData.append('image', image, image.name);
    this.props.uploadUserImg(formData);
  };

  inputHandler = () => {
    const imgInput = document.getElementById('imgInput');
    imgInput.click();
  };

  render() {
    const { firstName, lastName, email, photoURL } = this.props.user.credentials;
    return (
      <div className="container row">
        {this.renderRedirect()}
        <h1 className="profileHeader center">Profile</h1>
        <div className="card">
        <div className=" col l6 s12">
          <div className="profilePicConteiner">
            <a className="inputHandler tooltipped" data-position="right" data-tooltip="Edit photo" onClick={this.inputHandler}>
              <img className="profilePic circle" src={photoURL} />
              <input 
                id="imgInput"
                hidden="hidden" 
                type="file"
                onChange={this.handleImageChange}
              />
            </a>
          </div>
        </div>
        <div className="card col l6 s12">
          <div className="card-content">
            <div className="card-stacked">
              <div className="card-content">
                <p className="profileData flow-text">{`${firstName} ${lastName}`}</p>
                <p className="profileData flow-text">{email}</p>
              </div>
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
