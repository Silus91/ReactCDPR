import React, { Component } from "react";

export class CardTab extends Component {
  render() {
    return <div id={this.props.config.id}>{this.props.config.body}</div>;
  }
}

export default CardTab;
