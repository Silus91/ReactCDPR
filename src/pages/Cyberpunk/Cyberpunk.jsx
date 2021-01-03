import React from "react";
import YoutubeVideo from "../../components/YoutubeVideo/YoutubeVideo";
import CountdownTimer from "../../components/CountdownTimer/CountdownTimer";
import M from "materialize-css";
import { cyber } from "../../resources/textConfigs/info";
import "./Cyberpunk.css";

class Cyberpunk extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div className='center cyberpunkContainer'>
        <span>
          <h1 className='headerCyberpunk'>Cyberpunk</h1>
        </span>
        <div className='row container'>
          <div className=' col l12 card'>
            <div className='card-content cyberText'>{cyber}</div>
          </div>
          <div className='card col l8 s12'>
            <div className='card-content'>
              <YoutubeVideo videoId='LembwKDo1Dk' />
            </div>
          </div>
          <div className='col l4 s12 center-align flex'>
            <a
              rel='noopener noreferrer'
              className='btn-large cyberText red'
              target='_blank'
              href='https://www.cyberpunk.net/gb/en/pre-order'
            >
              ORDER
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Cyberpunk;
