import React, { Component } from 'react'

export class Card extends Component {
  render() {
    return (
      <>
        {this.props.configs.map((config) => {
          return (
            <div key={config.id}>
              <div>{config.body}</div>
            </div>
          )
        })}
      </>
    )
  }
}

export default Card;


