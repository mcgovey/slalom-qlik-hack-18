import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import centroid from '@turf/centroid';
import { polygon, multiPolygon } from '@turf/helpers';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapNewLayers from './MapNewLayers';
import MapExistingLayers from './MapExistingLayers';
import QlikObject from './QlikObject';
import qProps from '../qProps';

mapboxgl.accessToken = 'pk.eyJ1IjoibWNnb3ZleSIsImEiOiJjamZzYnltdDUwZGI4MzNxbDczeG5tZzJ5In0.8k2lw8EcAl9UCyNBHmvlVQ';

const layerOptions = {
  pts: {
    layerName: 'pts',
    type: 'heatmap',
    color: {
      colorByDim: 'metric1',
      measureNum: 0,
      minHex: '#b9b9b9',
      maxHex: '#9a0000',
      opacity: 0.5,
    },
    enableSelection: true,
    minZoom: 8,
    maxZoom: 12,
  },
  'building-shapes': {
    layerName: 'building-shapes',
    type: 'fill',
    color: {
      colorByDim: 'metric1',
      measureNum: 0,
      minHex: '#FFFFFF',
      maxHex: '#9a0000',
      border: '#000000',
      opacity: 1,
    },
    moveBbox: {
      zoomLvl: 2,
    },
    enableSelection: true,
    minZoom: 12,
    aboveLayer: 'poi-scalerank1',
  },
  neighborhoods: {
    layerName: 'neighborhoods',
    type: 'fill',
    color: {
      colorByDim: 'metric1',
      measureNum: 0,
      minHex: '#b9b9b9',
      maxHex: '#9a0000',
      border: '#222',
      opacity: 0.3,
    },
    enableSelection: true,
    aboveLayer: 'water',
  },
  'city-council-districts': {
    layerName: 'city-council-districts',
    type: 'fill',
    color: {
      colorByDim: 'metric1',
      measureNum: 0,
      minHex: '#b9b9b9',
      maxHex: '#9a0000',
      border: '#222',
      opacity: 0.3,
    },
    enableSelection: true,
    aboveLayer: 'water-label',
  },
  'climate-ready-social-vulnerability': {
    layerName: 'climate-ready-social-vulnerability',
    type: 'fill',
    color: {
      colorByDim: 'metric1',
      measureNum: 0,
      minHex: '#b9b9b9',
      maxHex: '#9a0000',
      border: '#444',
      opacity: 0.3,
    },
    enableSelection: true,
    aboveLayer: 'water',
  },
};


export default class Mapbox extends React.Component {
  static propTypes = {
    // qData: PropTypes.object.isRequired,
    // qLayout: PropTypes.object.isRequired,
    // select: PropTypes.func.isRequired,
    mapSelections: PropTypes.object.isRequired,
    mapLayerProps: PropTypes.object.isRequired,
    colorSelection: PropTypes.string.isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.map) {
      if (JSON.stringify(prevState.mapSelections) !== JSON.stringify(nextProps.mapSelections)) {
        return nextProps.mapSelections;
      }
    }
    return null;
  }


  constructor(props) {
    super(props);
    this.state = {
      // zoomProps: {
      //   zoomLvl: 'neighborhoods',
      //   zoomed: false,
      // },
    };
  }

  componentDidMount() {
    // console.log('map data', this.props.qData, 'layout', this.props.qLayout);
    console.log('map mounted', this.props.colorSelection);

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mcgovey/cjfzjx2uv40up2snwjhzj9rzz',
      center: [-71.0589, 42.3601], // starting position
      zoom: 10,
    });

    this.map.on('style.load', () => {
      // Create a popup, but don't add it to the map yet.
      const popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      this.bindHover();
      this.setState({
        map: this.map,
        popup,
      });
    });
  }

  componentWillUnmount() {
    // console.log('map removed');
    this.map.remove();
  }

  // updateZoomLvl(layer, zoomed) {
  //   this.setState({
  //     zoomProps: {
  //       zoomLvl: layer,
  //       zoomed,
  //     },
  //   });
  // }
  getCentroid(feature, polygonType) {
    let turfPolygon = {};
    if (this) {
      turfPolygon = polygonType === 'Polygon' ? polygon(feature) : multiPolygon(feature);
      // console.log('polygon', turfPolygon, centroid(turfPolygon));
    }
    return centroid(turfPolygon).geometry.coordinates;
  }
  bindHover() {
    // Change the cursor to a pointer when the mouse is over the places layer.
    this.map.on('mouseenter', 'building', (e) => {
      this.map.getCanvas().style.cursor = 'pointer';

      // console.log('building features', e.features[0]);
      const { geometry, properties } = e.features[0];

      const coordinates = geometry.type === 'Polygon' || geometry.type === 'MultiPolygon' ?
        this.getCentroid(geometry.coordinates, geometry.type) :
        geometry.coordinates.slice();
      const description = `Building type: ${properties.type}`;

      // // console.log('coords', coordinates, e.features[0], qHyperCube);

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      this.state.popup.setLngLat(coordinates)
        .setHTML(description)
        .addTo(this.state.map);
    });

    // Change it back to a pointer when it leaves.
    this.map.on('mouseleave', 'building', () => {
      this.map.getCanvas().style.cursor = '';
      // this.state.popup.remove();
    });
  }

  renderNewIndividualLayer(layer) {
    const mapComponents = {
      qTop: 0, qLeft: 0, qWidth: 9, qHeight: 500,
    };
    return (
      <QlikObject
        key={layer}
        qProp={qProps[layer]}
        type={this.props.mapLayerProps[layer].type}
        Component={MapNewLayers}
        qPage={mapComponents}
        componentProps={{
          options: layerOptions[layer],
          map: this.state.map,
          mapSelections: this.props.mapSelections,
          colorSelection: this.props.colorSelection,
          popup: this.state.popup,
        }}
      />
    );
  }

  renderLayers() {
    const { mapLayerProps, mapSelections } = this.props;
    return (
      Object.keys(mapLayerProps).map((layer) => {
        if (mapLayerProps[layer].builtBy === 'mapbox') {
          return this.renderExistingIndividualLayer(layer);
        } else if (mapLayerProps[layer].builtBy === 'qlik' && mapSelections[layer]) {
          return this.renderNewIndividualLayer(layer);
        }
        return '';
      })
    );
  }
  renderExistingIndividualLayer(layer) {
    return (
      <QlikObject
        key={layer}
        qProp={qProps[layer]}
        type={this.props.mapLayerProps[layer].type}
        Component={MapExistingLayers}
        // qPage={mapComponents}
        componentProps={{
          layerName: layer,
          visibilityState: this.props.mapSelections[layer],
          map: this.state.map,
          fieldName: this.props.mapLayerProps[layer].selectionField,
          dataType: this.props.mapLayerProps[layer].type,
          popup: this.state.popup,
        }}
      />
    );
  }

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      zIndex: -1,
      // height: 600,
      width: '100%',
      // textAlign: 'left',
    };


    return (
      <div>
        <div ref={(el) => { this.mapContainer = el; }} style={style} />
        {this.map ? this.renderLayers() : ''}
      </div>
    );
  }
}
