import React from 'react';
import YoutubeVideo from '../../components/YoutubeVideo/YoutubeVideo';
import CountdownTimer from '../../components/CountdownTimer/CountdownTimer';
import M from "materialize-css";
import netRunner from '../../resources/imgs/netRunner.png';
import cityCar from '../../resources/imgs/cityCar.jpg';
import cyber from '../../resources/imgs/cyber.png';
import config from './config';
import './Cyberpunk.css';


import InstagramEmbed from 'react-instagram-embed';
 


import { Parallax } from 'react-materialize';

class Cyberpunk extends React.Component {

  componentDidMount() {
    M.AutoInit();
  }

  render(){
    return(

      
      <div className="container center">
        <div className="wrapper">
          <div>
            <img className="responsive-img" src={cyber} alt="" />
          </div>
          <div className="row">
          <div className="col l3 s12 center-align  flex">
            <a className=" light-blue lighten-1 btn-large pulse">
              <CountdownTimer deadline='September 17, 2020' />
            </a>              
          </div>
          <div className="col l6 s12 m10 offset-m1">
            <YoutubeVideo videoId='LembwKDo1Dk' />
          </div>
          <div className="col l2  s12 center-align flex">
            <a className="btn-large yellow pulse" target="_blank" href="https://www.cyberpunk.net/gb/en/pre-order">
              PREORDER
            </a>              
          </div>
          </div>

          <Parallax
            image={<img alt="" src={netRunner} />}
            options={{
              responsiveThreshold: 10
            }}
           />
            
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

           
          <Parallax
            image={<img alt="" src={cityCar} />}
            options={{
              responsiveThreshold: 10
            }}
           />
        </div>
      </div>
    )
  }
}

export default Cyberpunk;