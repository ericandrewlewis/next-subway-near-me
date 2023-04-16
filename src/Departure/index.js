import React, { Component } from "react";
import './style.css';

const minutesFromNow = (unix) => {
  const nowInUnix = Math.floor(Date.now() / 1000);
  return Math.floor( (unix - nowInUnix) / 60 );
}

class Departure extends Component {
  render() {
    const { time, routeId } = this.props;

    const displayedTime = minutesFromNow(time);
    return (
      <div className="departure">
        <div className={`route-icon route-${routeId}`}>{routeId}</div> 
        <div className="time">{displayedTime} min</div>
      </div>
    );
  }
}

export default Departure;