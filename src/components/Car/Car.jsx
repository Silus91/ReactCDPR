import React, { Component } from 'react';
import { Carousel } from 'react-materialize';
import ciri_geralt from '../Carousel/ciri_geralt.jpg';
import dragon from '../Carousel/dragon.jpg';
import golem from '../Carousel/golem.jpg';
import gryf from '../Carousel/gryf.jpg';
import medalion from '../Carousel/medalion.jpg';
import swords from '../Carousel/swords.png';

export class Car extends Component {
  render() {
    return (
      <div>
        <Carousel options={{ fullWidth: true }}>

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
          </Carousel>
      </div>
    )
  }
}

export default Car
