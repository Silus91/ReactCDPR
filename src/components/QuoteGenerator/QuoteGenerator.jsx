import React, { Component } from 'react';
import allQuotes from './allQuotes';

class QuoteGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteIndex: 0
    }
  }

  componentDidMount() {
    setInterval(() => {this.randomizer()}, 10000);
  }

  randomizer() {
    const trow = Math.floor(Math.random() * 10) + 1;
    this.setState({ quoteIndex: trow })
  }

  render() {
    const { quoteIndex } = this.state;
    return (
      <span className="l4 offset-l4 s12">
        <h5 className="">{allQuotes[quoteIndex].quote}</h5>
        <span className="">{allQuotes[quoteIndex].author}</span>
      </span>
    )
  }
}

export default QuoteGenerator;