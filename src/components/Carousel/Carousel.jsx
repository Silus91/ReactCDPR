import React, { Component } from 'react';
import M from "materialize-css";

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

  renderCarousel() {
    const numbers = [1,2,3,4,5];

    return numbers.map((num, index)=> {
      return (
        <div className="carousel-item" key={index}>
          <img src={require(`../../resources/imgs/carous${num}.jpg`)} className="carousel-img" />
        </div>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="carousel carousel-slider center">
          {this.renderCarousel()}
        </div>
      </div>
    )
  }
}

export default Carousel;
