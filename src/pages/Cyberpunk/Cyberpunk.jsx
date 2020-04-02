import React from 'react';
import YoutubeVideo from '../../components/YoutubeVideo/YoutubeVideo';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';
import M from "materialize-css";
import netRunner from '../../resources/imgs/netRunner.png';
import cityCar from '../../resources/imgs/cityCar.jpg';
import cyber from '../../resources/imgs/cyber.png';
import config from './config';
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
          <div className="col l3 s12  flex">
              <a className=" light-blue lighten-1 btn-large pulse">
                <CountdownTimer deadline='September 17, 2020' />
              </a>              
            </div>
            <div className="col l6 s12 m8 offset-m2">
              <YoutubeVideo videoId='LembwKDo1Dk' />
            </div>
            <div className="col l2  s12 center-align flex">
              <a className="btn-large yellow pulse" href="https://www.cyberpunk.net/gb/en/pre-order">
                PREORDER
              </a>              
            </div>
          </div>
          {/* <div className="parallax-container">
            <div className="parallax">
              <img className="responsive-img" src={netRunner} alt="" />
            </div>
          </div>
          <div className="">
            <div className="row container">
              <h6 className="">{config}</h6>
            </div>
          </div>
          <div className="parallax-container">
            <div className="parallax">
              <img className="img" src={cityCar} alt="" />
            </div>
          </div> */}
        </div>
      </div>
    )
  }
}

export default Cyberpunk;