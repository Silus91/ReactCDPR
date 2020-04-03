import React, { Component } from 'react';
import M from "materialize-css";
import carouselConfig from './carouselConfig';
import './Carouselv2.css';


export class Carouselv2 extends Component {

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


  renderCarousel() {
    return(
      carouselConfig.map((config, index)=> {
      return (
        <div className="carousel-item" key={index}>
          <div className="card">
          <div className="card-image">
            <img src={config.img} alt="" />


          </div>
          

            <span className="card-title">asd
                   <a href={config.facebookURL}  target="_blank">
              <img src={config.facebookImg} alt="" />
            </a>
            </span>
       </div>
        </div>
      )
    })
    )
  } 

  render() {
    return (
      <div className="carousel carousel-slider center">
      {this.renderCarousel()}
    </div>
    )
  }
}

export default Carouselv2;


