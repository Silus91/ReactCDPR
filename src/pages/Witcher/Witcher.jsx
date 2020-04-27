import React from "react";
import YoutubeVideo from "../../components/YoutubeVideo/YoutubeVideo";
import "./Witcher.css";
import QuoteGenerator from "../../components/QuoteGenerator/QuoteGenerator";
import Carousel from "../../components/Carousel/Carousel";
import Collaps from "./../../components/Collaps/Collaps";
import M from "materialize-css";
import allQuotes from "../../resources/textConfigs/allQuotes";
import slides from "../../resources/textConfigs/slidesWitcher";
import collaps from "../../resources/textConfigs/collaps";

class Witcher extends React.Component {
  componentDidMount() {
    M.AutoInit();
  }

  render() {
    return (
      <div className='container'>
        <span className='witcherBackground'></span>
        <div className='row'>
          <div className='card col l7 s12'>
            <div className='card-content'>
              <YoutubeVideo videoId='c0i88t0Kacs' />
            </div>
          </div>
          <div className='col l5 s12 quote'>
            <Collaps collaps={collaps} />
          </div>
        </div>
        <div className='row'>
          <div className='col l4 s12 quote card'>
            <div className='card-content'>
              <QuoteGenerator time={10000} allQuotes={allQuotes} />
            </div>
          </div>
          <div className='card col l8 s12'>
            <div className='card-content'>
              <Carousel slides={slides} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Witcher;
