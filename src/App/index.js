import React, { Component } from "react";
import Geolocation from "react-geolocation";
import SubwayDeparturesPage from '../SubwayDeparturesPage';
import "./style.css";
const locations = [
  // Home
  {
    lat: 40.7213411,
    long: -73.993257
  },
  // City Hall
  {
    lat: 40.7136119,
    long: -74.0051314
  },
  {
    lat: 40.7359,
    long: -73.9911
  },
  // Franklin Ave Shuttle
  {
    lat: 40.678211,
    long: -73.9596304
  },
  // Times Square
  {
    lat: 40.7542647,
    long: -73.98682
  },
  // Flushing Main St
  {
    lat: 40.7595582,
    long: -73.8321161
  },
  // Rockaway
  {
    lat: 40.5805469,
    long: -73.8396189
  },
  // Union square
  {
    lat: 40.7356751,
    long: -73.9922806
  },

];

class App extends Component {
  render() {
    return (
      <div className="app">
        <Geolocation
          maximumAge={120}
          render={({
            fetchingPosition,
            position: { coords: { latitude, longitude } = {} } = {},
            error,
            getCurrentPosition
          }) =>
            <div>
              <h1 className="website-title">Next Trains <span aria-hidden="true">🚈 🌎 ⏱</span></h1>
              {error &&
                <div>
                  {error.message}
                </div>}
              {fetchingPosition &&
                <div>
                  <h2 className="loading-message">Determining your location...</h2>
                  <h2 className="loading-message">
                    <span className="globe globe-1" aria-hidden="true">🌍</span>
                    <span className="globe globe-2" aria-hidden="true">🌎</span>
                    <span className="globe globe-3" aria-hidden="true">🌏</span>
                  </h2>
                </div>
              }
              {!fetchingPosition && !error && process.env.NODE_ENV === 'development' && <SubwayDeparturesPage
                latitude={locations[0].lat}
                longitude={locations[0].long}
              />}
              {!fetchingPosition && !error && process.env.NODE_ENV === 'production' && <SubwayDeparturesPage
                latitude={latitude}
                longitude={longitude}
              />}
              <h2 style={{margin: '7rem 0'}}>
                Made with <span role="img" aria-label="love">💛</span> by <a style={{color: '#0F1A20'}} href="https://ericandrewlewis.com/">Eric Lewis</a>
                &nbsp;<a style={{color: '#0F1A20'}} href="https://github.com/ericandrewlewis/next-trains-near-me">source on Github</a>
                </h2>
            </div>}
          />
      </div>
    );
  }
}

export default App;
