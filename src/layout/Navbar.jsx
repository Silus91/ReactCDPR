import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/authActions";
import M from "materialize-css";
import "./Navbar.css";

const profilePic =
  "https://firebasestorage.googleapis.com/v0/b/cdred-project.appspot.com/o/pageImgs%2Fprofile.png?alt=media&token=12756539-29a9-4177-bb3b-c81548f4acbd";

class Navbar extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    const { authenticated, credentials } = this.props.user;
    const authLink = (
      <Fragment>
        <li>
          <Link to='/profile'>Profile</Link>
        </li>
        <li>
          <a onClick={() => this.props.logout()}>Log out</a>
        </li>
      </Fragment>
    );
    const guestLink = (
      <Fragment>
        <li>
          <Link to='/auth'>Sign</Link>
        </li>
      </Fragment>
    );

    return (
      <div className='navbar'>
        <nav className=''>
          <div className='nav-wrapper'>
            <a
              href='#'
              data-target='mobile-demo'
              className='show-on-small-only sidenav-trigger'
            >
              <i className='material-icons'>menu</i>
            </a>
            <ul className='right hide-on-med-and-down'>
              <li>
                <Link to='/'>Home</Link>
              </li>
              <li>
                <Link to='/cdproject'>Cd Project red</Link>
              </li>
              <li>
                <Link to='/cyberpunk'>Cyberpunk 2077</Link>
              </li>
              <li>
                <Link to='/witcher'>Witcher</Link>
              </li>
              {authenticated ? authLink : guestLink}
            </ul>
          </div>
        </nav>
        <ul className='right sidenav' id='mobile-demo'>
          <li>
            <div className='user-view'>
              <div className='background'>
                <img
                  alt='Johny Silver Hand'
                  src='https://firebasestorage.googleapis.com/v0/b/cdred-project.appspot.com/o/pageImgs%2FsilverHandMini.jpg?alt=media&token=ed5861f8-a999-490d-840c-86bd4cda1757'
                />
              </div>
              <a href='#user'>
                <img
                  alt=''
                  className='circle'
                  src={authenticated ? credentials.photoURL : profilePic}
                />
              </a>
              <a href='#name'>
                <span className='red-text name'>
                  {authenticated ? credentials.firstName : "Guest"}
                </span>
              </a>
            </div>
          </li>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/cdproject'>Cd Project red</Link>
          </li>
          <li>
            <Link to='/cyberpunk'>Cyberpunk 2077</Link>
          </li>
          <li>
            <Link to='/witcher'>Witcher</Link>
          </li>
          {authenticated ? authLink : guestLink}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { logout })(Navbar);
