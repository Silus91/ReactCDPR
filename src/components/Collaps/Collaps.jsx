import React, { Component } from "react";
import M from "materialize-css";
import "./Collaps.css";
import CollapsibleItem from "./CollapsibleItem";

class Collaps extends Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div className='container'>
        <ul className='collapsible expandable'>
          {this.props.collaps.map((collaps) => {
            return <CollapsibleItem collaps={collaps} key={collaps.id} />;
          })}
        </ul>
      </div>
    );
  }
}

export default Collaps;
