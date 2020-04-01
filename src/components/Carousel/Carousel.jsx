import React, { Component } from 'react';
import M from "materialize-css";

class Carousel extends Component {

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      // const options = {
      //   duration: 200,
      // };
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
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default Carousel;
