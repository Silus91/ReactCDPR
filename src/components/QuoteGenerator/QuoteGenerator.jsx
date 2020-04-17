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
          <h4 className="quote center">Opinions about that page<br /> Want to add your own?? Scroll bellow.</h4>
          <h5>{surveys[quoteIndex].opinion}</h5>
          <img  src={require(`../../resources/imgs/${surveys[quoteIndex].rating}Stars.png`)} className="img-size" />
    
        </>
      )
    }
  }

  render() {
    return (
      <div className="card">
        <div className="card-content">
          {this.renderGenerator()}
        </div>
      </div>
    )
  }
}

export default QuoteGenerator;