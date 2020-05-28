import React, { Component } from "react";

class QuoteGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteIndex: 0,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.randomizer();
    }, this.props.time);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  randomizer() {
    const { surveys, allQuotes } = this.props;
    const trow =
      Math.floor(
        Math.random() * Object.keys(surveys ? surveys : allQuotes).length - 1
      ) + 1;
    this.setState({ quoteIndex: trow });
  }

  renderGenerator() {
    const { quoteIndex } = this.state;
    const { surveys, allQuotes } = this.props;

    if (allQuotes) {
      return (
        <>
          <h5>{allQuotes[quoteIndex].quote}</h5>
          <span>{allQuotes[quoteIndex].book}</span>
        </>
      );
    } else {
      return (
        <>
          <p>{surveys[quoteIndex].opinion}</p>
          <img
            alt=''
            src={require(`../../resources/imgs/star/${surveys[quoteIndex].rating}Stars.png`)}
            className='img-size'
          />
        </>
      );
    }
  }

  render() {
    return <>{this.renderGenerator()}</>;
  }
}

export default QuoteGenerator;
