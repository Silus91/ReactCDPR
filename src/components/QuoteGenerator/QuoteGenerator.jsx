import React, { Component } from 'react';

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
    const trow = Math.floor(Math.random() * Object.keys(this.props.allQuotes).length -1) + 1;
    this.setState({ quoteIndex: trow })
  }
  
  render() {
    const { quoteIndex } = this.state;
    return (
      <div className="card">
        <div className="card-content">
          <h5 className="">{this.props.allQuotes[quoteIndex].quote}</h5>
          <span className="">{this.props.allQuotes[quoteIndex].book}</span>
        </div>
      </div>
    )
  }
}

export default QuoteGenerator;