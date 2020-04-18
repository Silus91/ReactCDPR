import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './Loader.css';


class Loader extends Component {
  render() {
    const { UI: { loading }} = this.props;
    return (
      <Fragment>
    { loading ?
      <div className="loaderContainer">
        {/* <div className="loaderPhoto"></div> */}

        <div className="preloader-wrapper big active">
    <div className="spinner-layer spinner-red-only">
      <div className="circle-clipper left">
        <div className="circle"></div>
      </div><div className="gap-patch">
        <div className="circle"></div>
      </div><div className="circle-clipper right">
        <div className="circle"></div>
      </div>
    </div>
  </div>

      </div>
      : null}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI,
 })


export default connect(mapStateToProps)(Loader);
