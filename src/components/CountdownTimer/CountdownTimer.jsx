import React, { Component } from "react";

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  componentDidMount() {
    this.getTimeUntil();
    this.interval = setInterval(() => this.getTimeUntil());
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  leadingZero = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  getTimeUntil() {
    const now = new Date();
    const time = Date.parse(this.props.deadline) - now;
    const seconds = Math.floor((time / 1000) % 60);
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const hours = Math.floor((time / (1000 * 60 * 60)) % 24);
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    this.setState({ days, hours, minutes, seconds });
  }

  render() {
    const { days, hours, minutes, seconds } = this.state;
    return (
      <>
        <span>D get ready{this.leadingZero(days)}</span>
        <span> H {this.leadingZero(hours)}</span>
        <span> M {this.leadingZero(minutes)}</span>
        <span> S {this.leadingZero(seconds)}</span>
      </>
    );
  }
}

export default CountdownTimer;
