import React from 'react';
import YoutubeVideo from '../../components/YoutubeVideo/YoutubeVideo';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';
import M from "materialize-css";
import config from './config';
import './Cyberpunk.css';
import { Parallax } from 'react-materialize';
import cyberLogo from '../../resources/imgs/cyberLogo.png';


import InstagramEmbed from 'react-instagram-embed';
 
class Cyberpunk extends React.Component {

  componentDidMount() {
    M.AutoInit();
  }

  render(){
    return(
      <div className="center first">
        <div className="container row">
          <Parallax
            image={<img alt="" src={cyberLogo} />}
            options={{
              responsiveThreshold: 20
            }}
          />
          <div className="col l3 s12 card yellow-text center-align counter flex flow-text cyan accent-2">
            <div className="card-content">
              <CountdownTimer deadline='September 17, 2020' />
            </div>
          </div>
          <div className="col l2  s12 center-align flex">
            <a className="btn-large yellow pulse" target="_blank" href="https://www.cyberpunk.net/gb/en/pre-order">
              PREORDER
            </a>             
          </div>
          <div className="card col l7 s12">
            <div className="card-content">
              <YoutubeVideo videoId='LembwKDo1Dk' />
            </div>
          </div>
                      <InstagramEmbed
              url='https://www.instagram.com/p/B5_zQFSn3zQ/?utm_source=ig_web_copy_link'
              maxWidth={400}
              hideCaption={false}
              containerTagName='div'
              protocol=''
              injectScript
              onLoading={() => {}}
              onSuccess={() => {}}
              onAfterRender={() => {}}
              onFailure={() => {}}
            />
        </div>
      </div>
    )
  }
}

export default Cyberpunk;