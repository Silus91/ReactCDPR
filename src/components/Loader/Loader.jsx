import React, { Component } from 'react';
import './Loader.css';
import M from "materialize-css";

class Loader extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div id="modal1" className="modal">
        <div className="modal-content">
          <div class="wraper">
            <div class="progressbar-wrapper">
              <div class="progressbar">
                <div class="side front">
                    <div class="bar"></div>
                </div>
                <div class="side back">
                    <div class="bar"></div>
                </div>
                <div class="side top">
                    <div class="bar"></div>
                </div>
                <div class="side bottom">
                    <div class="bar"></div>
                </div>
                <div class="side left"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Loader;
