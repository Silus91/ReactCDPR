import React from 'react';
import YoutubeVideo from '../../components/YoutubeVideo/YoutubeVideo';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';
import M from "materialize-css";
import config from './config';
import './Cyberpunk.css';

import InstagramEmbed from 'react-instagram-embed';
 
class Cyberpunk extends React.Component {

  componentDidMount() {
    M.AutoInit();
  }

  render(){
    return(
      <div className="center cyberpunkContainer">
        <span>
          <h1 className="headerCyberpunk">Cyberpunk</h1>
        </span>
        <div className="row container">
          <div className=" col l12 card">
            <div className="card-content cyberText">{config}</div>
          </div>

          <div className="col l4 s12 insta center">
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
          <div className="card col l8 s12">
            <div className="card-content">
              <YoutubeVideo videoId='LembwKDo1Dk' />
            </div>
          </div>
          <div className="col l4 s12">
          <div className="card counter">
            <div className="card-content">
              <CountdownTimer deadline='September 17, 2020' />
            </div>
          </div>
           </div>
          <div className="col l4 s12 center-align flex">
            <a rel="noopener noreferrer" className="btn-large cyberText red" target="_blank" href="https://www.cyberpunk.net/gb/en/pre-order">
             PREORDER
            </a>             
          </div>
        </div>
      </div>
    )
  }
}

export default Cyberpunk;
