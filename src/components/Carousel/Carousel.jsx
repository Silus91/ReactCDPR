import React, { Component } from 'react';
import M from "materialize-css";
import ciri_geralt from './ciri_geralt.jpg';
import dragon from './dragon.jpg';
import golem from './golem.jpg';
import gryf from './gryf.jpg';
import medalion from './medalion.jpg';
import swords from './swords.png';


class Carousel extends Component {

  componentDidUpdate() {
      document.addEventListener('DOMContentLoaded', function() {
        const options = {
          duration: 200,
          
        };
        const elems = document.querySelectorAll('.carousel');
        const instances = M.Carousel.init(elems,{
          indicators: true,
          fullWidth: true,
        });
      }
    )
  }

  render() {
    return (
      <div>
        <div className="carousel carousel-slider center">
          <div className="carousel-item" href="#one!">
          <img className="responsive-img" src={ciri_geralt} alt="" />
          </div>
          <div className="carousel-item" href="#two!">
          <img className="responsive-img" src={golem} alt="" />
          </div>
          <div className="carousel-item" href="#three!">
          <img className="responsive-img" src={swords} alt="" />

          </div>
          <div className="carousel-item" href="#four!">
            <img className="responsive-img" src={dragon} alt="" />
          </div>
          <div className="carousel-item" href="#five!">
            <img className="responsive-img" src={medalion} alt="" />
          </div>
          <div className="carousel-item" href="#six!">
            <img className="responsive-img" src={gryf} alt="" />
          </div>
        </div>
        <p>siema</p>
      </div>
    )
  }
}

export default Carousel;
