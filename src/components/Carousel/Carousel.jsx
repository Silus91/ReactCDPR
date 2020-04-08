import React, { Component } from 'react';
import M from "materialize-css";
import CarouselSlide from './CarouselSlide';

class Carousel extends Component {

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.getElementById('carousel');
      const instances = M.Carousel.init(elems,{
        duration: 200,
        fullWidth: true,
      });
      const instance = M.Carousel.getInstance(elems);
      instance.next();
      setInterval(() => { instance.next() }, 3000);
    })  
  }

  render() {
    return (
      <div>
        <div id="carousel" className="carousel carousel-slider center">
          {this.props.slides.map((slide) => {
            return <CarouselSlide slide={slide} key={slide.id} />
          })}
        </div>
      </div>
    )
  }
}

export default Carousel;
