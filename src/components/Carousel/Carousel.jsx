import React, { Component } from "react";
import M from "materialize-css";
import CarouselSlide from "./CarouselSlide";

class Carousel extends Component {
  componentDidMount() {
    document.addEventListener("DOMContentLoaded", function () {
      const elems = document.getElementById("carousel");
      const instances = M.Carousel.init(elems, {
        duration: 200,
        fullWidth: true,
      });
    });
  }

  startInterval() {
    const elems = document.getElementById("carousel");
    const instance = M.Carousel.getInstance(elems);
    this.interval = setInterval(() => {
      instance.next();
    }, 3000);
  }

  stopInterval() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <a
          className='btn-floating btn-medium teal right'
          onClick={() => {
            this.startInterval();
          }}
        >
          <i className='material-icons small'>all_inclusive</i>
        </a>
        <a
          className='btn-floating btn-medium red right'
          onClick={() => {
            this.stopInterval();
          }}
        >
          <i className='material-icons small'>block</i>
        </a>
        <div id='carousel' className='carousel carousel-slider center'>
          {this.props.slides.map((slide) => {
            return <CarouselSlide slide={slide} key={slide.id} />;
          })}
        </div>
      </div>
    );
  }
}

export default Carousel;
