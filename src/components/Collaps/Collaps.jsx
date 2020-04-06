import React, { Component } from 'react';
import M from "materialize-css";
import './Collaps.css';
import CollapsibleItem from './CollapsibleItem';

class Collaps extends Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div className="container">
        <ul className="collapsible expandable">
        {this.props.colaps.map((colaps) => {
            return <CollapsibleItem colaps={colaps} key={colaps.id} />
          })}
        </ul>
      </div>
    )
  }
}

export default Collaps;
