import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

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
  static propTypes = {
    qData: PropTypes.object.isRequired,
  };


  componentDidMount() {
    console.log('map data', this.props.qData, 'props', this.props);
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mcgovey/cj4fxtkfr23bv2so0r31krygf',
      center: [-75.272, 42.646], // starting position
    });

    // Initialize geojson data source for points
    const sourceGeojson = {
      type: 'FeatureCollection',
      features: [],
    };

    // const valMin = 1;
    // const valMax = 50;
    // const dotMin = 5;
    // const dotMax = 12;

    // // Add a data source
    // this.map.addSource('pts', {
    //   type: 'geojson',
    //   data: sourceGeojson,
    // });

    // // Add a layer
    // this.map.addLayer({
    //   id: 'pts',
    //   source: 'pts',
    //   type: 'circle',
    //   layout: {},
    //   paint: {
    //     circleColor: '#ffffff',
    //     circleOpacity: 1,
    //     circleRadius: {
    //       property: 'metric',
    //       stops: [
    //         [valMin, dotMin],
    //         [valMax, dotMax],
    //       ],
    //     },
    //   },
    // });

    // map.on('click', 'pts', function (e) {
    // // var features = map.queryRenderedFeatures(e.point);
    // // console.log('features clicked', e.features[0]);
    // app.field( fieldName ).selectValues([e.features[0].properties.area], false, false);
    // // document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
    // });

    // // Change the cursor to a pointer when the mouse is over the places layer.
    // map.on('mouseenter', 'pts', function () {
    // map.getCanvas().style.cursor = 'pointer';
    // });

    // // Change it back to a pointer when it leaves.
    // map.on('mouseleave', 'pts', function () {
    // map.getCanvas().style.cursor = '';
    // });    
  }

  componentDidUpdate() {
    console.log('updated');

  //   var valMin = data.qHyperCube.qMeasureInfo[0].qMin,
  //   valMax = data.qHyperCube.qMeasureInfo[0].qMax,
  //   dotMin = 10,
  //   dotMax = 40;

  // // Build the geojson based on your hypercube data
  // sourceGeojson.features = data.qHyperCube.qDataPages[0].qMatrix.map(function(d) {
  //   return {
  //     "type": "Feature",
  //     "geometry": {
  //       "type": "Point",
  //       "coordinates": [d[2].qNum, d[1].qNum]
  //     },
  //     "properties": {
  //       "area": d[0].qText,
  //       "metric": d[3].qNum
  //     }
  //   }
  //   });
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
