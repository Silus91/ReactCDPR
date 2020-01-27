import React, { Component } from 'react'

export class CountdownTimer extends Component {
  constructor(props){
    super(props);
    this.state = { 
      deadline: 'September 17, 2020',
      days:0,
      hours:0,
      minutes:0,
      seconds:0
    }
  }

  componentWillMount (){
    this.getTimeUntil();
  }

  componentDidMount() {
    setInterval(() => this.getTimeUntil());
  }
  
  leadingZero = (num) => {
    if (num < 10) {
      return '0' + num;
    }
    return num;
  }

  getTimeUntil(){
    const now = new Date();
    const time = Date.parse(this.state.deadline) - now;
    const seconds = Math.floor((time/1000) % 60);
    const minutes = Math.floor((time/1000/60) % 60);
    const hours = Math.floor(time/(1000 * 60 * 60) % 24);
    const days = Math.floor(time/(1000 * 60 * 60*24));
    this.setState({days,hours, minutes, seconds});
  }

  render() {
    const {days, hours, minutes, seconds} = this.state;
    return (
      <div>
        {/* <span>APRIL 16TH, 2020</span> */}
        <span>D {this.leadingZero(days)} </span>
        <span>| H {this.leadingZero(hours)} </span>
        <span>| M {this.leadingZero(minutes)} </span>
        <span>| S {this.leadingZero(seconds)}</span>
      </div>   
    )
  }
}

export default CountdownTimer;