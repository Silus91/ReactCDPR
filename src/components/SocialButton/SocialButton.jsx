import React, { Component } from 'react';
import M from "materialize-css";

export class SocialButton extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <>
        <a href={this.props.href} className="tooltipped" data-position={this.props.toolPosition} data-tooltip={this.props.toolTip} target="_blank" rel="noopener noreferrer">
          <img className="imgsize" src={this.props.src} alt="" />
        </a>
      </>
    )
  }
}

export default SocialButton;
