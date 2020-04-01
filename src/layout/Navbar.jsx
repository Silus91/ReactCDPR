import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import M from "materialize-css";
import cityCar from '../resources/imgs/cityCar.jpg';
import samurai from '../resources/imgs/samurai.png';

class Navbar extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render(){
    const { authenticated, credentials } = this.props.user;
    const authLink = (
      <Fragment>
        <li><a onClick={() => this.props.logout()}>Log out</a></li>
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
          <li>
            <div className="user-view">
              <div className="background">
                <img src={cityCar} />
              </div>
              <a href="#user"><img className="circle" src={authenticated ? credentials.photoURL : samurai} /></a>
              <a href="#name"><span className="white-text name">{authenticated ? credentials.firstName : "Guest"}</span></a>
            </div>
          </li>
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