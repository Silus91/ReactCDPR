import React, { Component } from 'react';
import { connect } from 'react-redux';
import Stock from '../../components/Stock/Stock';
import M from "materialize-css";
import './Home.css';
import Carousel  from '../../components/Carousel/Carousel';
import slides from './slides';
import CardTabs from '../../components/CardTabs/CardTabs';
import configs from './configs';

class Home extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    const { user } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="card col l7 s12">
            <div className="card-content">
              <Carousel
                slides={slides}
              />
            </div>
          </div> 
          <div className="col l5 s12">
            <CardTabs 
              configs={configs}
            />
          </div>
            <div className=" col l7 s12 stock z-depth-2 hoverable">
              <Stock />
            </div>
        </div>
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