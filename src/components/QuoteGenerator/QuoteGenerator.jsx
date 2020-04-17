import React, { Component } from 'react';

class QuoteGenerator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quoteIndex: 5
    }
  }

  componentDidMount() {
    setInterval(() => {this.randomizer()}, 10000);
  }  
  
  randomizer() {
    const trow = Math.floor(Math.random() * Object.keys(this.props.surveys).length -1) + 1;
    this.setState({ quoteIndex: trow })
  }
  
  // picker(){
  //   const { quoteIndex } = this.state;
  //   if(this.props.allQuotes){
  //     return(
  //       <>
  //         <h5 className="">{this.props.allQuotes[quoteIndex].quote}</h5>
  //         <span className="">{this.props.allQuotes[quoteIndex].book}</span>
  //       </>
  //     )
  //   }  else {
  //     return(
  //       <>

  //       </>
  //     )
  //   }

  // }



  render() {
    const { quoteIndex } = this.state;
    return (
      <div className="card">
        <div className="card-content">
        <h5 className="">{this.props.surveys[quoteIndex].rating}</h5>
          <span className="">{this.props.surveys[quoteIndex].opinion}</span>        
        </div>
      </div>
    )
  }
}

export default QuoteGenerator;