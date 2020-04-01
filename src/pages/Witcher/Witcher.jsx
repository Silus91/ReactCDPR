import React from 'react';
import YoutubeVideo from '../../components/YoutubeVideo/YoutubeVideo';
import './Witcher.css';
import QuoteGenerator from '../../components/QuoteGenerator/QuoteGenerator';
import Carousel  from '../../components/Carousel/Carousel';
import Collaps from './../../components/Collaps/Collaps';
import M from "materialize-css";
import allQuotes from '../../resources/allQuotes';

class Witcher extends React.Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
    let numbers = [0,1,2,3,4];
  return(
    <div className="container">
      <div className="row">
      <div className="col l6 s12 m8 offset-m2">
          <YoutubeVideo videoId='c0i88t0Kacs' />
      </div>
        <div className="col l6 s12">
            <QuoteGenerator allQuotes={allQuotes} />
        </div>
          <div className="col l6 s12">
            <Collaps />
          </div>
          <div className="col l8 s12 offset-l2">
            <Carousel>
              {numbers.map((index)=> {
                return (
                  <div className="carousel-item" key={index}>
                    <img src={require(`../../resources/imgs/carous${index}.jpg`)} className="carousel-img" alt="" />
                  </div>
                )
              })}
            </Carousel>
          </div> 
      </div>
      <h3>dzieje sie</h3>
      </div>
    );
  }
};

export default Witcher;

//all imgs  the same px W and H