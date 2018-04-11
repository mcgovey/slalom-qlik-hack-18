import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWNnb3ZleSIsImEiOiJjamZzYnltdDUwZGI4MzNxbDczeG5tZzJ5In0.8k2lw8EcAl9UCyNBHmvlVQ';


export default class Mapbox extends React.Component {
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
    qLayout: PropTypes.object.isRequired,
    // select: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      map: {},
    };
  }

  componentDidMount() {
    console.log('map data', this.props.qData, 'props', this.props);

    // const {
    //   sourceGeojson, valMin, valMax, dotMin, dotMax,
    // } = this.state;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-71.0589, 42.3601], // starting position
      zoom: 10,
    });

    const valMin = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMin;
    const valMax = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMax;
    const dotMin = 10;
    const dotMax = 40;

    // Build the geojson based on your hypercube data
    const sourceGeojson = {
      type: 'FeatureCollection',
      features: this.props.qData.qMatrix.map(d => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [d[2].qNum, d[1].qNum],
        },
        properties: {
          pid: d[0].qText,
          // metric: d[3].qNum,
        },
      })),
    };

    map.on('style.load', () => {
      // console.log('style param', e);
      // Add a data source
      map.addSource('pts', {
        type: 'geojson',
        data: sourceGeojson,
      });

      // Add a layer
      map.addLayer({
        id: 'pts',
        source: 'pts',
        type: 'circle',
        layout: {},
        paint: {
          'circle-color': '#ffffff',
          'circle-opacity': 1,
          'circle-radius': {
            property: 'metric',
            stops: [
              [valMin, dotMin],
              [valMax, dotMax],
            ],
          },
        },
      });
      // this.setState({ map });
    });

    console.log('map', map);
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
    console.log('updated', this.props, this.state, 'layout', this.props.qLayout, 'map', this.state.map);

    // const valMin = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMin;
    // const valMax = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMax;
    // const dotMin = 10;
    // const dotMax = 40;

    // Build the geojson based on your hypercube data
    const sourceGeojson = {
      type: 'FeatureCollection',
      features: this.props.qData.qMatrix.map(d => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [d[2].qNum, d[1].qNum],
        },
        properties: {
          pid: d[0].qText,
          // metric: d[3].qNum,
        },
      })),
    };

    console.log('sourceGeojson', sourceGeojson);

    this.state.map.getSource('pts').setData(sourceGeojson);
    // this.state.map.setPaintProperty('pts', 'circle-radius', {
    //   property: 'metric',
    //   stops: [
    //     [valMin, dotMin],
    //     [valMax, dotMax],
    //   ],
    // });
    // this.state.map.setPaintProperty('pts', 'circle-color', {
    //   property: 'metric',
    //   stops: [
    //     [valMin, '#ece7f2'],
    //     [valMax, '#023858'],
    //   ],
    // });
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
