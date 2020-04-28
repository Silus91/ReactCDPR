import React, { Component } from "react";

export class CollapsibleItem extends Component {
  render() {
    return (
      <>
        <li className='active'>
          <div className='collapsible-header'>
            <img src={this.props.collaps.img} className='circle img' alt='' />
            <h6>{this.props.collaps.title}</h6>
          </div>
          <div className='collapsible-body'>
            <span>{this.props.collaps.content}</span>
          </div>
        </li>
      </>
    );
  }
}

export default CollapsibleItem;
