import React, { Component } from 'react';
// import './TextInput.css';

export class TextInput extends Component {
  render() {
    return (
      <div className="input-field">
        <i className="material-icons prefix">{this.props.icon}</i>
        <label className="active" for={this.props.for}>{this.props.label}</label>
        <input type={this.props.type} id={this.props.id} className="validate" onChange={this.props.onChange} />
        <span className="helper-text red-text center-align">{this.props.errors}</span>
      </div>
    )
  }
}

export default TextInput;
