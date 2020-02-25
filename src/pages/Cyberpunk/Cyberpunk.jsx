import React from 'react';
import YoutubeVideo from '../../components/YoutubeVideo/YoutubeVideo';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';
import M from "materialize-css";
import netRunner from './netRunner.png';
import cityCar from './cityCar.jpg';
import cyber from './cyber.png';
import './Cyberpunk.css';

class Cyberpunk extends React.Component {

  componentDidMount() {
    M.AutoInit();
  }

  render(){
    return(
      <div className="container">
        <div className="wrapper">
          <div>
            <img className="responsive-img" src={cyber} alt="" />
          </div>
          <div className="row">
          <div className="col l3 s12 center-align flex">
              <a className=" light-blue lighten-1 btn-large pulse">
                <CountdownTimer />
              </a>              
            </div>
            <div className="col l6 s12 m8 offset-m2">
              <YoutubeVideo videoId='LembwKDo1Dk' />
            </div>
            <div className="col l2  s12 center-align flex">
              <a className="btn-large yellow pulse" href="https://www.cyberpunk.net/gb/en/pre-order">
                PREORDER<i className="material-icons right">attach_money</i>
              </a>              
            </div>
          </div>
          <div className="parallax-container">
            <div className="parallax">
              <img className="responsive-img" src={netRunner} alt="" />
            </div>
          </div>
          <div className="row">
            <br />
          </div>
          <div className="parallax-container">
            <div className="parallax">
              <img className="img" src={cityCar} alt="" />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Cyberpunk;