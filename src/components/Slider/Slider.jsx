import React, { Component } from 'react';
import dzida from './dzida.jpg';
import M from "materialize-css";

class Slider extends Component {

  componentDidMount(){
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.sidenav');
      const instances = M.Slider.init(elems, {});
    });
  }


  render() {
    return (
      <div>
        <div className="slider">
          <ul className="slides">
            <li>
            <img className="img" src={dzida} alt="" />
              <div className="caption center-align">
                <h3>This is our big Tagline!</h3>
                <h5 className=" black-text text-lighten-3">Here's our sadfsadf slogan.</h5>
              </div>
            </li>
            <li>

            <img className="img" src={dzida} alt="" />
              <div className="caption left-align">
                <h3>Left Aligned Caption</h3>
                <h5 className="black-text text-lighten-3">Here's our cbxcvbdf slogan.</h5>
              </div>
            </li>
            <li>

            <img className="img" src={dzida} alt="" />
              <div className="caption right-align">
                <h3>Right Aligned Caption</h3>
                <h5 className=" black-text text-lighten-3">Here's our dsfgegdfs slogan.</h5>
              </div>
            </li>
            <li>

            <img className="img" src={dzida} alt="" />
              <div className="caption center-align">
                <h3>This is our big Tagline!</h3>
                <h5 className=" black-text text-lighten-3">Here's our dfsgsedfeer slogan.</h5>
              </div>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Slider;
