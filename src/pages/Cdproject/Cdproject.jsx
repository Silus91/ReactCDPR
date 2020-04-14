import React, { Component } from 'react';
import Stock from '../../components/Stock/Stock';
import Carousel  from '../../components/Carousel/Carousel';
import slides from '../Home/slides';
import CardTabs from '../../components/CardTabs/CardTabs';
import configs from '../Home/configs';


export class Cdproject extends Component {
  render() {
    return (
      <div>
        <div className="row">

        <div className=" col l7 s12 stock z-depth-2 hoverable">
          <Stock />
          </div>
          <div className="card col l7 s12">
            <div className="card-content">
              <Carousel
                slides={slides}
              />
            </div>
          </div> 
          <div className="col l5 s12">
            <CardTabs 
              configs={configs}
            />
          </div>
          </div>
      </div>
    )
  }
}

export default Cdproject;
