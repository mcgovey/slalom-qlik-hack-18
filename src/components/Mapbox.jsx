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
    // select: PropTypes.func.isRequired,
    mapSelections: PropTypes.object.isRequired,
  };
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log('called props', nextProps, prevState);

  //   if (prevState.map) {
  //     console.log('map drawn');
  //   }
  //   return nextProps;
  // }


  constructor(props) {
    super(props);
    this.state = {
      // map: {},
    };
  }

  componentDidMount() {
    // console.log('map data', this.props.qData, 'layout', this.props.qLayout);

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mcgovey/cjfzjx2uv40up2snwjhzj9rzz',
      center: [-71.0589, 42.3601], // starting position
      zoom: 10,
    });
    // console.log('map', map);

    // const featureData = this.props.qData.qMatrix.filter(d => d[1].qText !== '-');

    // // Build the geojson based on your data
    // const sourceGeojson = {
    //   type: 'FeatureCollection',
    //   features: featureData.map(d => ({
    //     type: 'Feature',
    //     geometry: {
    //       type: 'Point',
    //       coordinates: [JSON.parse(d[1].qText)[0], JSON.parse(d[1].qText)[1]],
    //     },
    //     properties: {
    //       objectid: d[0].qText,
    //       // metric: d[3].qNum,
    //     },
    //   })),
    // };

    // // Build the geojson based on your data
    // const sourceBuildingGeojson = {
    //   type: 'FeatureCollection',
    //   features: featureData.map(d => ({
    //     type: 'Feature',
    //     geometry: {
    //       type: 'MultiPolygon',
    //       coordinates: JSON.parse(d[2].qText),
    //     },
    //     properties: {
    //       objectid: d[0].qText,
    //       // metric: d[3].qNum,
    //     },
    //   })),
    // };
    // console.log('map', sourceBuildingGeojson, sourceGeojson, this.props.select);

    const geoJSON = this.createJSONObjs();

    const valMin = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMin;
    const valMax = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMax;
    const dotMin = 10;
    const dotMax = 40;

    map.on('style.load', () => {
      // console.log('style param', e);
      // Add a data source
      map.addSource('pts', {
        type: 'geojson',
        data: geoJSON.sourceGeojson,
      });
      map.addSource('building-shapes', {
        type: 'geojson',
        data: geoJSON.sourceBuildingGeojson,
      });


      // Add a layer
      map.addLayer({
        id: 'pts',
        source: 'pts',
        type: 'circle',
        minzoom: 7,
        maxzoom: 12,
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
        id: 'building-shapes',
        source: 'building-shapes',
        type: 'fill',
        minzoom: 12,
        layout: {},
        paint: {
          'fill-color': '#fff',
          'fill-opacity': 0.8,
        },
      });
      // this.setLayerState(this.state.layerState);
      this.setState({ map });
      this.setLayerVisibility(this.props.mapSelections);
      this.moveBoundingBox(geoJSON.sourceGeojson);
    });

    // Object.keys(this.props.mapSelections).map((layer) => {
    //   this.makeSelections(layer, 'OBJECTID');
    //   return true;
    // });
  }

  componentDidUpdate() {
    const geoJSON = this.createJSONObjs();

    this.state.map.getSource('pts').setData(geoJSON.sourceGeojson);
    this.state.map.getSource('building-shapes').setData(geoJSON.sourceBuildingGeojson);
    this.setLayerVisibility(this.props.mapSelections);

    this.moveBoundingBox(geoJSON.sourceGeojson);
  }
  componentWillUnmount() {
    this.map.remove();
  }

  setLayerVisibility(mapSelections) {
    Object.keys(mapSelections).map((layer) => {
      console.log('called props', layer, this.state.map);
      // const visibility = this.state.map.getLayoutProperty(layer, 'visibility');
      // console.log('visibility', visibility);
      if (mapSelections[layer]) {
        this.state.map.setLayoutProperty(layer, 'visibility', 'visible');
      } else {
        this.state.map.setLayoutProperty(layer, 'visibility', 'none');
      }
      return layer;
    });
  }

  makeSelections(layer, field) {
    // console.log('map', map);
    this.state.map.on('click', layer, (e) => {
      // var features = map.queryRenderedFeatures(e.point);
      console.log('features clicked', e.features[0], field);
      // app.field( fieldName ).selectValues([e.features[0].properties.area], false, false);
      // document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    this.state.map.on('mouseenter', layer, () => {
      this.state.map.getCanvas().style.cursor = 'pointer';
    });

    // Change it back to a pointer when it leaves.
    this.state.map.on('mouseleave', layer, () => {
      this.state.map.getCanvas().style.cursor = '';
    });
  }

  createJSONObjs() {
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

    // Build the geojson based on your data
    const sourceBuildingGeojson = {
      type: 'FeatureCollection',
      features: featureData.map(d => ({
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
    return {
      sourceGeojson,
      sourceBuildingGeojson,
    };
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
