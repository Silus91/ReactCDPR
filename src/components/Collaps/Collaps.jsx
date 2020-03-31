import React, { Component } from 'react';
import M from "materialize-css";
import './Collaps.css';
import config from './config';

class Collaps extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  renderCollaps() {
    return config.map((conf, index) => {
      return (
        <li className="active" key={index}>
          <div className="collapsible-header">
            <img src={require(`../../resources/imgs/wm${index +1}.png`)} className="circle img" alt="" /><h6>{conf.title}</h6>
          </div>
          <div className="collapsible-body"><span>{conf.content}</span></div>
        </li>
      )
    })
  }

  render() {
    return (
      <div className="container">
        <ul className="collapsible expandable">
          {this.renderCollaps()}
        </ul>
      </div>
    )
  }
}



export default Collaps;
