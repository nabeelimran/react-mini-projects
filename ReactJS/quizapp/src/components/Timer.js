import React, { Component } from 'react';


class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      timer : 5 * 60,
    }
    
    this.minutes=0;
    this.seconds=0;

    this.startTimer = this.startTimer.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    let {timer} = this.state;
    this.minutes = parseInt(timer / 60)
    this.seconds = parseInt(timer % 60);
  
    this.minutes = this.minutes < 10 ? "0" + this.minutes : this.minutes;
    this.seconds = this.seconds < 10 ? "0" + this.seconds : this.seconds;
  
    --timer;
    this.setState({ timer });
    if(timer < 0) {
      this.props.Result();
    }
    else
      setTimeout(this.startTimer , 1000);
  }

  render() {
    return(
      <div className='timer'>
        <span> {this.minutes} : {this.seconds} </span>
      </div>
    );
  }
}

export default Timer;