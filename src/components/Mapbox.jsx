import React from 'react';
// import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1IjoibWNnb3ZleSIsImEiOiJjamZzYnltdDUwZGI4MzNxbDczeG5tZzJ5In0.8k2lw8EcAl9UCyNBHmvlVQ';


export default class Mapbox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 5,
      lat: 34,
      zoom: 1.5,
    };
  }

  componentDidMount() {
    const { lng, lat, zoom } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom,
    });

    map.on('move', () => {
      const mapCtr = map.getCenter();
      this.setState({
        lng: mapCtr.lng.toFixed(4),
        lat: mapCtr.lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  render() {
    const { lng, lat, zoom } = this.state;

    return (
      <div>
        <div className="inline-block absolute top left mt12 ml12 bg-darken75 color-white z1 py6 px12 round-full txt-s txt-bold">
          <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
        </div>
        <div ref={(el) => { this.mapContainer = el; }} className="mapbox absolute top right left bottom" />
      </div>
    );
  }
}
