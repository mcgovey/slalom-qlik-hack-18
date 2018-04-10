import React from 'react';
// import ReactDOM from 'react-dom';
import mapboxgl from 'mapbox-gl';
// import '//api.tiles.mapbox.com/mapbox-gl-js/v0.39.1/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWNnb3ZleSIsImEiOiJjamZzYnltdDUwZGI4MzNxbDczeG5tZzJ5In0.8k2lw8EcAl9UCyNBHmvlVQ';


export default class Mapbox extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     lng: 5,
  //     lat: 34,
  //     zoom: 1.5,
  //   };
  // }

  // componentDidMount() {
  //   const { lng, lat, zoom } = this.state;

  //   const map = new mapboxgl.Map({
  //     container: this.mapContainer,
  //     style: 'mapbox://styles/mapbox/streets-v9',
  //     center: [lng, lat],
  //     zoom,
  //   });

  //   map.on('move', () => {
  //     const mapCtr = map.getCenter();
  //     this.setState({
  //       lng: mapCtr.lng.toFixed(4),
  //       lat: mapCtr.lat.toFixed(4),
  //       zoom: map.getZoom().toFixed(2),
  //     });
  //   });
  // }

  // render() {
  //   const { lng, lat, zoom } = this.state;

  //   return (
  //     <div>
  //       <div className="inline-block ">
  //         <div>{`Longitude: ${lng} Latitude: ${lat} Zoom: ${zoom}`}</div>
  //       </div>
  //       <div ref={(el) => { this.mapContainer = el; }}
  //           style={{ width: '400px', height: '300px' }} />
  //     </div>
  //   );
  // }
  componentDidMount() {
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mcgovey/cj4fxtkfr23bv2so0r31krygf', // 'mapbox://styles/mapbox/streets-v9',
    });
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    const style = {
      // position: 'absolute',
      top: 0,
      bottom: 0,
      height: 600,
      width: '100%',
      textAlign: 'left',
    };

    return <div style={style} ref={(el) => { this.mapContainer = el; }} />;
  }
}
