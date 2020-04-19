import React, { Component } from 'react';
import { Toast } from 'react-materialize';
import { connect } from 'react-redux';

export class ToastSender extends Component {



//next state next toast trzeba sprawdzic czy ja to potrzebuje




  render() {
    const { UI: { toast }} = this.props;
    return (
      <>
        <Toast options={{html: toast}} />
      </>
    )
  }
}

const mapStateToProps = (state) => ({
  UI: state.UI
})

//{ removeFlashMessage } akcja REMOVE_TOAST

export default connect(mapStateToProps)(ToastSender);
