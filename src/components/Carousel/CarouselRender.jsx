import React, { Component } from "react";
import { Carousel } from "react-materialize";
import CarouselSlide from "./CarouselSlide";
import "./Carousel.css";

class CarouselRender extends Component {
  render() {
    return (
      <div>
        <Carousel
          carouselId='Carousel-2'
          className='carousel carousel-slider center'
          options={{
            fullWidth: true,
            indicators: true,
            duration: 200,
          }}
        >
          {this.props.slides.map((slide) => {
            return <CarouselSlide slide={slide} key={slide.id} />;
          })}
        </Carousel>
      </div>
    );
  }
}

export default CarouselRender;
