import React, { Component } from "react";
import M from "materialize-css";

export class TextArea extends Component {
  componentDidMount() {
    M.AutoInit();
  }
  render() {
    return (
      <div className='input-field'>
        <i className='material-icons prefix'>{this.props.icon}</i>
        <label className='active' htmlFor={this.props.htmlFor}>
          {this.props.label}
        </label>
        <textarea
          id={this.props.id}
          className='materialize-textarea'
          onChange={this.props.onChange}
        ></textarea>
        <span className='helper-text red-text center-align'>
          {this.props.errors}
        </span>
      </div>
    );
  }
}

export default TextArea;
