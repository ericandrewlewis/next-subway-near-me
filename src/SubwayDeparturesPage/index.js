import React, { Component } from "react";
import complexes from 'mta-subway-complexes';
import Complex from '../Complex';

const calculateDistanceBetweenCoords = (x1, y1, x2, y2) => {
  return Math.sqrt(
    (x2 - x1) ** 2 + (y2 - y1) ** 2
  );
}

const getNearbyComplexes = ({complexes, latitude, longitude}) => {
  const compareComplexes = (a, b) => {
    const distanceToA = calculateDistanceBetweenCoords(
      latitude, longitude, a['latitude'], a['longitude']
    );
    const distanceToB = calculateDistanceBetweenCoords(
      latitude, longitude, b['latitude'], b['longitude']
    );
    return distanceToA - distanceToB;
  }
  const complexesArr = Object.values(complexes);
  const sortedComplexes = complexesArr.sort(compareComplexes);

  return sortedComplexes.slice(0, 15);
}

class SubwayDeparturesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      responses: [],
      errorMessage: '',
    }
    this.fetchDepartures = this.fetchDepartures.bind(this);
  }

  async componentDidMount() {
    this.fetchDepartures();
    setInterval(this.fetchDepartures, 30000);
  }

  async fetchDepartures() {
    const { latitude, longitude } = this.props;
    const nearbyComplexes = getNearbyComplexes({complexes, latitude, longitude });
    let url = '/api/departures.json?' + nearbyComplexes.map(complex => `complexIds[]=${complex.id}`).join('&');
    const response = await fetch(url);
    const responseJson = await response.json();
    if (responseJson.status === 'ok') {
      this.setState({
        responses: responseJson.data.departuresResponse,
      });
    }
    if (responseJson.status === 'error') {
      this.setState({
        errorMessage: responseJson.errorMessage,
      });
    }
  }
  
  render() {
    const { latitude, longitude } = this.props;
    if (this.state.errorMessage) {
      return (
        <div>{this.state.errorMessage}</div>
      );
    }
    return (
      <div>
        {this.state.responses.map(response => {
          return (
            <Complex
              key={response.complexId}
              id={response.complexId}
              name={response.name} 
              lines={response.lines}
              latitude={latitude}
              longitude={longitude}
            />
          );
        })}
      </div>
    );
  }
}

export default SubwayDeparturesPage;