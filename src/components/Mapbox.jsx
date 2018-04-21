import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapNewLayers from './MapNewLayers';
import MapExistingLayers from './MapExistingLayers';
import QlikObject from './QlikObject';
import qProps from '../qProps';

mapboxgl.accessToken = 'pk.eyJ1IjoibWNnb3ZleSIsImEiOiJjamZzYnltdDUwZGI4MzNxbDczeG5tZzJ5In0.8k2lw8EcAl9UCyNBHmvlVQ';

const layerOptions = {
  pts: {
    layerName: 'pts',
    type: 'circle',
    color: {
      measureNum: 0,
      minHex: '#b9b9b9',
      maxHex: '#9a0000',
      opacity: 0.5,
    },
    enableSelection: false,
    minZoom: 10,
    maxZoom: 12,
  },
  'building-shapes': {
    layerName: 'building-shapes',
    type: 'fill',
    color: {
      measureNum: 0,
      minHex: '#b9b9b9',
      maxHex: '#9a0000',
      border: '#222',
      opacity: 0.8,
    },
    moveBbox: {
      zoomLvl: 2,
    },
    enableSelection: true,
    minZoom: 12,
  },
  neighborhoods: {
    layerName: 'neighborhoods',
    type: 'fill',
    color: {
      measureNum: 0,
      minHex: '#b9b9b9',
      maxHex: '#9a0000',
      border: '#222',
      opacity: 0.3,
    },
    moveBbox: {
      zoomLvl: 1,
    },
    enableSelection: true,
    aboveLayer: 'water',
  },
  'city-council-districts': {
    layerName: 'city-council-districts',
    type: 'fill',
    color: {
      measureNum: 0,
      minHex: '#b9b9b9',
      maxHex: '#9a0000',
      border: '#222',
      opacity: 0.3,
    },
    moveBbox: {
      zoomLvl: 1,
    },
    enableSelection: true,
    aboveLayer: 'water',
  },
  'climate-ready-social-vulnerability': {
    layerName: 'climate-ready-social-vulnerability',
    type: 'fill',
    color: {
      measureNum: 0,
      minHex: '#b9b9b9',
      maxHex: '#9a0000',
      border: '#444',
      opacity: 0.3,
    },
    moveBbox: {
      zoomLvl: 1,
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
      zoomLvl: 1,
    };
  }

  componentDidMount() {
    // console.log('map data', this.props.qData, 'layout', this.props.qLayout);
    console.log('map mounted');

    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mcgovey/cjfzjx2uv40up2snwjhzj9rzz',
      center: [-71.0589, 42.3601], // starting position
      zoom: 10,
    });

    this.map.on('style.load', () => {
      this.setState({
        map: this.map,
      });
    });
  }

  componentWillUnmount() {
    console.log('map removed');
    this.map.remove();
  }

  updateZoomLvl(zoomLvl) {
    this.setState({ zoomLvl });
  }

  renderNewIndividualLayer(layer) {
    const mapComponents = {
      qTop: 0, qLeft: 0, qWidth: 7, qHeight: 500,
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
          zoomLvl: this.state.zoomLvl,
          updateZoomLvl: this.updateZoomLvl.bind(this),
        }}
      />
    );
  }

  renderLayers() {
    return (
      Object.keys(this.props.mapLayerProps).map((layer) => {
        if (this.props.mapLayerProps[layer].builtBy === 'mapbox') {
        // if (layer === 'neighborhoods') {
          return this.renderExistingIndividualLayer(layer);
        } else if (this.props.mapLayerProps[layer].builtBy === 'qlik') {
          // console.log('built by qlik');
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
