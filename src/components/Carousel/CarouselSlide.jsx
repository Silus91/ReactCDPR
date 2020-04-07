import React, { Component } from 'react';
import './Carousel.css';

class CarouselSlide extends Component {
  
  render() {
    return (
      <div className="carousel-item">
        <img src={this.props.slide.img} className="responsive-img" alt="" />
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
      </div>
    )
  }
}

export default CarouselSlide;

// socialBtn = (social) => {
//   const { Url, Img } = this.props;
//   if(social) {
//     return(
//       <a href={this.props.slide.social}  target="_blank">
//         <img src={this.props.slide.social} className="imgsize" alt="" />
//       </a>
//     )
//   } else return null;
// }




