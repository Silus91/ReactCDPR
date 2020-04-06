import React from 'react';
import YoutubeVideo from '../../components/YoutubeVideo/YoutubeVideo';
import './Witcher.css';
import QuoteGenerator from '../../components/QuoteGenerator/QuoteGenerator';
import Carousel  from '../../components/Carousel/Carousel';
import Collaps from './../../components/Collaps/Collaps';
import M from "materialize-css";
import allQuotes from '../../resources/allQuotes';
import slides from './slides';
import colaps from '../../components/Collaps/colaps';

class Witcher extends React.Component {

  componentDidMount() {
    M.AutoInit();
  }

  render() {
  return(
    <div className="">
      <span className="witcherContainer"></span>
      <div className="container">
        <div className="row">
        <div className="col l6 s12 m8 offset-m2">
          <YoutubeVideo videoId='c0i88t0Kacs' />
        </div>
        <div className="col l6 s12">
          <Collaps 
          colaps={colaps}/>
        </div>      
        <div className="col l5 s12">
            <QuoteGenerator allQuotes={allQuotes} />
        </div>

          <div className="card col l7 s12">
            <div className="card-content">
            <Carousel
              slides={slides}
            />
            </div>

          </div> 
      </div>
          <p>  s</p>
        </div>
      </div>
    );
  }
};

export default Witcher;
