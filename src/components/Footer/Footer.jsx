import React, { Component } from 'react';
import faceb from './faceb.png';
import insta from './insta.png';
import twitter from './twitter.png';

export class Footer extends Component {
  render() {
    return (
      <div>
        <a className="btn modal-trigger" href="#modal1">Want some more info?</a>

        <div id="modal1" className="modal bottom-sheet">
          <div className="modal-content">
            <div className="row">
              <div className="card col l4 m4 s4">
              <a href={"https://www.facebook.com/CDPROJEKTRED/?epa=SEARCH_BOX"}><img className="imgsize" alt="" src={faceb} /></a>

              </div>
              <div className="card col l4 m4 s4">
              <a href={"https://twitter.com/CDPROJEKTRED"}><img className="imgsize" src={twitter} alt="" /></a>

              </div>
              <div className="card col l4 m4 s4">
              <a href={"https://www.instagram.com/cdpred/?hl=pl"}><img className="imgsize" src={insta} alt="" /></a>

              </div>
            </div>
            
        </div>
      </div>
      </div>
    )
  }
}

export default Footer
