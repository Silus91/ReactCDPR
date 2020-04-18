import React, { Component } from 'react';

class QuoteGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteIndex: 0
    }
  }

  componentDidMount() {
    setInterval(() => {this.randomizer()}, this.props.time);
  }  
  
  randomizer() {
    const { surveys, allQuotes } = this.props;
    const trow = Math.floor(Math.random() * Object.keys(surveys ? surveys : allQuotes).length -1) + 1;
    this.setState({ quoteIndex: trow })
  }
  
  renderGenerator(){
    const { quoteIndex } = this.state;
    const { surveys, allQuotes } = this.props;

    if(allQuotes){
      return(
        <>
          <h5 className="">{allQuotes[quoteIndex].quote}</h5>
          <span className="">{allQuotes[quoteIndex].book}</span>
        </>
      )
    }  else {
      return(
        <>
          <h5>{surveys[quoteIndex].opinion}</h5>
          <img  src={require(`../../resources/imgs/${surveys[quoteIndex].rating}Stars.png`)} className="img-size" />
        </>
      )
    }
  }

  render() {
    return (
      <>
        {this.renderGenerator()}
      </>
    )
  }
}

export default QuoteGenerator;