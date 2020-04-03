import React, { Component } from 'react';

export class SocialButton extends Component {
  render() {
    return (
      <>
        <a href={this.props.href} target="_blank">
          <img className="imgsize" src={this.props.src} alt="" />
        </a>
      </>
    )
  }
}

export default SocialButton;
