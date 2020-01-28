import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import M from "materialize-css";

class Navbar extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render(){
    const { authenticated, credentials } = this.props.user;

    const authLink = (
      <Fragment>
        <li><a onClick={() => this.props.logout()} >Log out</a></li>
      </Fragment>
    )

    const guestLink = (
      <Fragment>
        <li><Link to='/login'>Login</Link></li>
        <li><Link to='/register'>Register</Link></li>
      </Fragment>
    )

    return (
      <div>
        <nav className="navbar-fixed grey darken-3">
          <div className="nav-wrapper">
            <a href="#" data-target="mobile-demo" className="show-on-small-only sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><Link to='/'>Cd Project red</Link></li>
              <li><Link to='/cyberpunk'>Cyberpunk 2077</Link></li>
              <li><Link to='/witcher'>Witcher</Link></li>
              { authenticated ? authLink : guestLink }
            </ul>
          </div>
        </nav>
        <ul className="right sidenav" id="mobile-demo">
          <li><p>{ authenticated ? credentials.handle : "Guest"}</p></li>
          <li><Link to='/'>Cd Project red</Link></li>
          <li><Link to='/cyberpunk'>Cyberpunk 2077</Link></li>
          <li><Link to='/witcher'>Witcher</Link></li>
          { authenticated ? authLink : guestLink }
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, { logout }) (Navbar);