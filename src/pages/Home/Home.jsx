import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stock from '../../components/Stock/Stock';
import M from "materialize-css";
import './Home.css';
import config from './config';
import Switch from '../../components/Switch/Switch';
import Carousel  from '../../components/Carousel/Carousel';
import slides from '../../components/Carouselv2/slides';

class Home extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  renderCards() {
    return config.map((conf, index) => {
      return (
        <div className="card" key={index}>
          <div className="card card-content col l5 s12 stock z-depth-2 hoverable">
            <span>{conf}</span>
          </div>
        </div>
      )
    })
  }

  render() {
    const { user, lightTheme } = this.props;
    return (
      <div className={ lightTheme ? " light" : "dark"}>
        <div className="row">

        <div className="col l7 s12">
          <Carousel 
            slides={slides}
          />
        </div>

        {this.renderCards()}

            <div className=" col l7 s12 stock z-depth-2 hoverable">
              <Stock />
            </div>
        </div>

        <Switch />
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