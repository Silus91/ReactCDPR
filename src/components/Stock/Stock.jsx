import React, { Component } from 'react';
import Plot from 'react-plotly.js';

class Stock extends Component {
  constructor(props){
    super(props);
    this.state = {
      stockChartValuesX: [],
      stockChartValuesY: []
     }
   }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    const API_CDR = process.env.REACT_APP_STOCK_API_CDR;

    let stockChartValuesXFunction = [];
    let stockChartValuesYFunction = [];

    fetch(API_CDR)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const cutted = data['dataset']['data'].slice(0,30);

      for (var i = 0; i < cutted.length; i++) {
        stockChartValuesXFunction.push(cutted[i][0]);
        stockChartValuesYFunction.push(cutted[i][1]);
      }

      pointerToThis.setState({
        stockChartValuesX: stockChartValuesXFunction,
        stockChartValuesY: stockChartValuesYFunction
      })
    })
  }

  render() {
    return (
      <div>
        <Plot
          data={[
            {
              x: this.state.stockChartValuesX,
              y: this.state.stockChartValuesY,
              type: 'scatter',
              mode: 'lines',
              marker: {color: 'red'},
              legendgroup:false
            },
          ]}
          layout={{autosize: true, title: 'CD Project Red SA', showlegend: false}}
          displayModeBar= {false}
          useResizeHandler={true}
          style={{width: "100%", height: "100%"}}
          config={{
            // staticPlot: true on mobile it should be true need some info how it should be on mobile on
            displayModeBar: false
          }}
        />
      </div>
    )
  }
}

export default Stock;