import React from 'react';
import YoutubeVideo from '../../components/YoutubeVideo/YoutubeVideo';
import './Witcher.css';
import QuoteGenerator from '../../components/QuoteGenerator/QuoteGenerator';
import Carousel from '../../components/Carousel/Carousel';
import Collaps from './../../components/Collaps/Collaps';
// import Slider from '../../components/Slider/Slider';
import M from "materialize-css";


class Witcher extends React.Component {

  componentDidMount() {
    M.AutoInit();
  }

render() {
  return(
    <div className="container">
      <div className="row">


          <div className=" col l6 s12 card">
              <QuoteGenerator />
          </div>

          <div className="col l6 s12">
            <Collaps />
          </div>
          <div className="col l10 s12 offset-l1">
            <Carousel />
          </div> 

      </div>


      {/* <div>
        <Slider />
      </div> */}
      

        {/*
      <div className="video-detail col-md-8">
          <YoutubeVideo videoId='c0i88t0Kacs' />
      </div>*/}




    </div>
  );
}
};

export default Witcher;

//all imgs  the same px W and H