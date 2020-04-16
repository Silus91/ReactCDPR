import React, { Component } from 'react';
import M from "materialize-css";
import './Home.css';
import { Parallax } from 'react-materialize';
import cityCar from '../../resources/imgs/cityCarv2.jpg';
import silverHand from '../../resources/imgs/silverHand.jpg';
import {creatorInfo, why } from './info';
import githubimg from '../../resources/imgs/social/githubimg.png';
import SocialButton from '../../components/SocialButton/SocialButton';
import Survey from '../../components/Survey/Survey';
 
class Home extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div className="">
         <div className="header">
          <div className="container headerContent">
            <h1 className="title">Welcome!</h1>
            <h2 className="titleSecond">CD Project Red <br />Fan Page!</h2>
            <div>Want to jump to orginal page?? Just Click below!</div>
            <a rel="noopener noreferrer" className="btn large cyan yellow-text" href="https://en.cdprojektred.com/" target="_blank">
              Redirect
            </a>
          </div>
        </div>
        <div className="section white row container">
          <div className='center'>
            <h3 className="titleSecond">Info from creator</h3>
            <p className="paragraph">{creatorInfo}</p>
            <SocialButton
              src={githubimg} 
              href="https://github.com/Silus91/ReactCDPR"
            />
          </div>
        </div>
        <div>
          <Parallax
            image={<img alt="" src={cityCar} />}
            options={{
              responsiveThreshold: 0
            }}
          />
          <div className="section white">
            <div className="row container">
              <p className="paragraph">{why}</p>
            </div>
          </div>
          <Parallax
            image={<img alt="" src={silverHand} />}
            options={{
            responsiveThreshold: 0
            }}
          />
          <div className="section white row container">
            <div className="col l6 m6 s12 card">
              <div className="card-content">
                <Survey />
              </div>
            </div>
          </div>
        </div> 
      </div>
    )
  }
}

export default Home;
