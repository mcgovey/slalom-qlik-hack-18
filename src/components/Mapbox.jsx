import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import bbox from '@turf/bbox';
import { lineString } from '@turf/helpers';
import 'mapbox-gl/dist/mapbox-gl.css';

mapboxgl.accessToken = 'pk.eyJ1IjoibWNnb3ZleSIsImEiOiJjamZzYnltdDUwZGI4MzNxbDczeG5tZzJ5In0.8k2lw8EcAl9UCyNBHmvlVQ';


export default class Mapbox extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    select: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      // map: {},
    };
  }

  componentDidMount() {
    console.log('map data', this.props.qData, 'layout', this.props.qLayout);

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-71.0589, 42.3601], // starting position
      zoom: 10,
    });
    console.log('map', map);

    const featureData = this.props.qData.qMatrix.filter(d => d[1].qText !== '-');

    // Build the geojson based on your data
    const sourceGeojson = {
      type: 'FeatureCollection',
      features: featureData.map(d => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [JSON.parse(d[1].qText)[0], JSON.parse(d[1].qText)[1]],
        },
        properties: {
          objectid: d[0].qText,
          // metric: d[3].qNum,
        },
      })),
    };


    const buildingFeatureData = this.props.qData.qMatrix.filter(d => d[2].qText !== '-');

    // Build the geojson based on your data
    const sourceBuildingGeojson = {
      type: 'FeatureCollection',
      features: buildingFeatureData.map(d => ({
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: JSON.parse(d[2].qText),
        },
        properties: {
          objectid: d[0].qText,
          // metric: d[3].qNum,
        },
      })),
    };
    console.log('map', sourceBuildingGeojson, sourceGeojson, this.props.select);

    const valMin = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMin;
    const valMax = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMax;
    const dotMin = 10;
    const dotMax = 40;

    map.on('style.load', () => {
      // console.log('style param', e);
      // Add a data source
      map.addSource('pts', {
        type: 'geojson',
        data: sourceGeojson,
      });
      map.addSource('shapes', {
        type: 'geojson',
        data: sourceBuildingGeojson,
      });


      // Add a layer
      map.addLayer({
        id: 'pts',
        source: 'pts',
        type: 'circle',
        minzoom: 7,
        maxzoom: 14,
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

      // Add a layer
      map.addLayer({
        id: 'shapes',
        source: 'shapes',
        type: 'fill',
        minzoom: 12,
        layout: {},
        paint: {
          'fill-color': '#aaa',
          'fill-opacity': 0.8,
        },
      });
      this.setState({ map });
      this.moveBoundingBox(sourceGeojson);
    });

    // console.log('map', map);
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
    // // console.log('updated', 'layout', this.props.qLayout, 'map', this.state.map);
    const featureData = this.props.qData.qMatrix.filter(d => d[1].qText !== '-');

    // Build the geojson based on hypercube data
    const sourceGeojson = {
      type: 'FeatureCollection',
      features: featureData.map(d => ({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: JSON.parse(d[1].qText), // [d[1].qNum, d[1].qNum],
        },
        properties: {
          objectid: d[0].qText,
          // metric: d[3].qNum,
        },
      })),
    };
    const buildingFeatureData = this.props.qData.qMatrix.filter(d => d[2].qText !== '-');

    // Build the geojson based on your data
    const sourceBuildingGeojson = {
      type: 'FeatureCollection',
      features: buildingFeatureData.map(d => ({
        type: 'Feature',
        geometry: {
          type: 'MultiPolygon',
          coordinates: JSON.parse(d[2].qText),
        },
        properties: {
          objectid: d[0].qText,
          // metric: d[3].qNum,
        },
      })),
    };
    // console.log('sourceGeojson', sourceGeojson);

    this.state.map.getSource('pts').setData(sourceGeojson);
    this.state.map.getSource('shapes').setData(sourceBuildingGeojson);

    this.moveBoundingBox(sourceGeojson);
  }

  componentWillUnmount() {
    this.map.remove();
  }

  moveBoundingBox(sourceGeojson) {
    if (sourceGeojson.features.length > 1) {
      const pts = sourceGeojson.features.map(d => d.geometry.coordinates);
      const line = lineString(pts);
      const bound = bbox(line);
      // console.log('bounding box', this.state.map, bound);

      this.state.map.fitBounds([
        [bound[0], bound[1]],
        [bound[2], bound[3]],
      ], { padding: 50 });
    } else if (sourceGeojson.features.length === 1) {
      this.state.map.flyTo({
        center: sourceGeojson.features[0].geometry.coordinates,
        zoom: 15,
      });
    }
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
