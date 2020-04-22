import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/authActions';
import M from "materialize-css";
import './Navbar.css';
import samurai from '../resources/imgs/samurai.png';
import silverHand from '../resources/imgs/silverHandMini.jpg';

class Navbar extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render(){
    const { authenticated, credentials } = this.props.user;
    const authLink = (
      <Fragment>
        <li><Link to='/profile'>Profile</Link></li>
        <li><a onClick={() => this.props.logout()}>Log out</a></li>
      </Fragment>
    )
    const guestLink = (
      <Fragment>
        <li><Link to='/auth'>Sign</Link></li>
      </Fragment>
    )

    return (
      <div className="navbar">
        <nav className="">
          <div className="nav-wrapper">
            <a href="#" data-target="mobile-demo" className="show-on-small-only sidenav-trigger"><i className="material-icons">menu</i></a>
            <ul className="right hide-on-med-and-down">
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/cdproject'>Cd Project red</Link></li>
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
                <img alt="" src={silverHand} />
              </div>
              <a href="#user"><img alt="" className="circle" src={authenticated ? credentials.photoURL : samurai} /></a>
              <a href="#name"><span className="white-text name">{authenticated ? credentials.firstName : "Guest"}</span></a>
            </div>
          </li>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/cdproject'>Cd Project red</Link></li>
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