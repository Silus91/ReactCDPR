import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stock from '../../components/Stock/Stock';
import M from "materialize-css";
import './Home.css';
import config from './config';
import cd_logo from './cd_logo.png';
import Footer from '../../components/Footer/Footer';
import Switch from '../../components/Switch/Switch';

class Home extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  renderCards() {
    return config.map((conf, index) => {
      return (
        <div className="card" key={index}>
          <div className="card-content col l5 offset-l1 s12 card z-depth-2 hoverable">
            <span>{conf}</span>
          </div>
        </div>
      )
    })
  }

  render() {
    const { user, lightTheme } = this.props;
    return (
      <div className={ lightTheme===true ? "light" : "dark" }>
        <div className="row">
          <div className="center">
            <img className="card responsive-img" src={cd_logo} alt="" />
          </div>
          <div className="card">
            <div className="card-content col l6 s12 card z-depth-2 hoverable">
              <Stock />
            </div>
          </div>
          {this.renderCards()}
        </div>

        <Switch />
        <button className="center"><Footer /></button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return{
    user: state.user,
    lightTheme: state.UI.lightTheme
  }
}

export default connect(mapStateToProps)(Home);