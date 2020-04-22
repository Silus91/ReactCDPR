import React, { Component } from 'react';
import './Carousel.css';

class CarouselSlide extends Component {
  
  render() {
    return (
      <div className="carousel-item" >
        <img src={this.props.slide.img} className="responsive-img" alt="" />
        {this.props.slide.facebookUrl ? 
          <div>
          {this.props.slide.facebookUrl ? 
            <a href={this.props.slide.facebookUrl} rel="noopener noreferrer"  target="_blank">
              <img src={this.props.slide.facebookImg} className="imgsize" alt="" />
            </a>
            : null}
          {this.props.slide.twitterUrl ? 
            <a href={this.props.slide.twitterUrl} rel="noopener noreferrer" target="_blank">
              <img src={this.props.slide.twitterImg} className="imgsize" alt="" />
            </a>
            : null}
            {this.props.slide.instagramUrl ? 
            <a href={this.props.slide.instagramUrl} rel="noopener noreferrer" target="_blank">
              <img src={this.props.slide.instagramImg} className="imgsize" alt="" />
            </a>  
            : null}
          </div>
         : null }
      </div>
    )
  }
}

export default CarouselSlide;
