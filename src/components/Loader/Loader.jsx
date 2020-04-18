import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';


class Loader extends Component {
  render() {
    const { UI: { loading }} = this.props;
    return (
      <Fragment>
    { loading ?
      <>
        <p>Loading....</p>
      </>
      : null}
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI
 })


export default connect(mapStateToProps)(Loader);
