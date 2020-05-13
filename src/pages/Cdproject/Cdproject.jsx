import React, { Component } from "react";
import Stock from "../../components/Stock/Stock";
import CarouselRender from "../../components/Carousel/CarouselRender";
import slides from "../../resources/textConfigs/slidesCDPR";
import CardTabs from "../../components/CardTabs/CardTabs";
import configs from "../../resources/textConfigs/configsCDPR";
import M from "materialize-css";
import { connect } from "react-redux";
import { getStockValue } from "../../actions/uiActions";

class Cdproject extends Component {
  componentDidMount() {
    const {
      UI: { stock },
    } = this.props;
    M.AutoInit();
    if (!stock.length > 0) {
      console.log("cdred did");
      this.props.getStockValue();
    }
  }

  render() {
    const {
      UI: { loading },
      UI: { stock },
    } = this.props;
    return (
      <div>
        <h1 className='titleSecond center'>CD Project Red SA</h1>
        <div className='row'>
          <div className=' col l12 stock z-depth-2'>
            {stock.length > 0 ? <Stock stock={stock} /> : loading}
          </div>
          <div className='card col l7 s12'>
            <div className='card-content'>
              <CarouselRender slides={slides} />
            </div>
          </div>
          <div className='col l5 s12'>
            <CardTabs configs={configs} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps, { getStockValue })(Cdproject);
