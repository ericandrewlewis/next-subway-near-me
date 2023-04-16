import React, { Component } from "react";
import Departure from '../Departure';
import './style.css';
import subwayStations from 'mta-subway-stations';

class Line extends Component {
  render() {
    const { departures, stationId } = this.props;
    const station = subwayStations.find(station => station['Station ID'] === stationId);
    const northboundTitle = station['North Direction Label'];
    const southboundTitle = station['South Direction Label'];

    return (
      <div className="line">
        <div className="northbound-southbound-wrapper">
          <div className="northbound">
            <h3 className="northbound-heading">{northboundTitle}</h3>
            {departures.N.slice(0, 5).map(departure => {
              return <Departure
                key={departure.time}
                time={departure.time}
                routeId={departure.routeId}
              />;
            })}
          </div>
          <div className="southbound">
            <h3 className="southbound-heading">{southboundTitle}</h3>
            {departures.S.slice(0, 5).map(departure => {
              return <Departure
                key={departure.time}
                time={departure.time}
                routeId={departure.routeId}
              />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Line;