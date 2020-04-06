import React, { Component } from 'react';
import M from "materialize-css";
import homeCarousel from './homeCarousel';
import './Carouselv2.css';

export class Carouselv2 extends Component {

  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.getElementById('carousel');
      const instances = M.Carousel.init(elems,{
        duration: 200,
        fullWidth: true,
      });
      const instance = M.Carousel.getInstance(elems);
      instance.next();
        setInterval(() => {
          instance.next();
        }, 3000);
      }
    )       
  }


  renderCarousel() {
    return(
      carouselConfig.map((config, index)=> {
      return (
        <div className="carousel-item" key={index}>
          <img src={config.img} className="responsive-img" />
          <div>
          <a href={config.facebookURL}  target="_blank">
            <img src={config.facebookImg} className="imgsize" alt="" />
          </a>
          <a href={config.twitterURL}  target="_blank">
            <img src={config.twitterImg} className="imgsize" alt="" />
          </a>
          {config.instagramURL ? 
          <a href={config.instagramURL}  target="_blank">
            <img src={config.instagramImg} className="imgsize" alt="" />
          </a>  
          : null}
          </div>
        </div>
      )
    })
    )
  } 

  render() {
    return (
      <div id="carousel" className="carousel carousel-slider center">
      {this.renderCarousel()}
    </div>
    )
  }
}

export default Carouselv2;