import React, { Component } from 'react';
import Plot from 'react-plotly.js';
import'./Stock.css';

const values = new Set([30, 60, 120, 360, 1000]);

class Stock extends Component {
  constructor(props){
    super(props);
    this.state = {
      stockChartValuesX: [],
      stockChartValuesY: [],
      radioValue: 120
     }
   }

  componentDidMount() {
    this.fetchStock();
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.radioValue !== this.state.radioValue) {
      console.log("state changed", this.state.radioValue);
      return this.fetchStock();
    }
  }

  renderRadio() {
    return Array.from(values).map((value, index) => (
      <span key={index}>
        <label>
          <input name="group1" type="radio" onChange={this.handleChange} value={value} />
          <span>{value} Days</span>
        </label>
      </span>
    ));
  }

  fetchStock() {
    const { radioValue } = this.state;
    const pointerToThis = this;
    const API_CDR = process.env.REACT_APP_STOCK_API_CDR;

    let stockChartValuesXFunction = [];
    let stockChartValuesYFunction = [];

    fetch(API_CDR)
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      const cutted = data['dataset']['data'].slice(0,radioValue);

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

  handleChange = event => {
    this.setState({radioValue: event.target.value});
  }

  render() {
    const { radioValue } = this.state;
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
        <div>
          <span className="red-text left">{`Showing data from ${radioValue} days`}</span>
          <div className="radioBtn right">
            {this.renderRadio()}
          </div>
        </div>
      </div>
    )
  }
}

export default Stock;
