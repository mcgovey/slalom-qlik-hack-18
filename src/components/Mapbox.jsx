import React from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapNewLayers from './MapNewLayers';
import MapExistingLayers from './MapExistingLayers';
import QlikObject from './QlikObject';
import qProps from '../qProps';

mapboxgl.accessToken = 'pk.eyJ1IjoibWNnb3ZleSIsImEiOiJjamZzYnltdDUwZGI4MzNxbDczeG5tZzJ5In0.8k2lw8EcAl9UCyNBHmvlVQ';

const layerFieldNameMap = {
  neighborhoods: 'Neighborhood',
  'sea-level-rise': 'sea-levl-rise',
  'groundwater-conversvation': 'Groundwater Conservation',
  'climate-ready-social-vulnerability': 'Climate-Ready Social Vulnerability',
  'city-council-districts': 'city-council-districts-id',
};

export default class Mapbox extends React.Component {
  static propTypes = {
    // qData: PropTypes.object.isRequired,
    // qLayout: PropTypes.object.isRequired,
    // select: PropTypes.func.isRequired,
    mapSelections: PropTypes.object.isRequired,
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('called props', nextProps, prevState);

    if (prevState.map) {
      console.log('map drawn');
    }
    return nextProps;
  }


  // static setLayerVisibility(mapSelections, layer, map) {
  //   // Object.keys(mapSelections).map((layer) => {
  //   console.log('called props', mapSelections, layer, map);
  //   // const visibility = this.state.map.getLayoutProperty(layer, 'visibility');
  //   // console.log('visibility', visibility);
  //   if (mapSelections[layer]) {
  //     map.setLayoutProperty(layer, 'visibility', 'visible');
  //   } else {
  //     map.setLayoutProperty(layer, 'visibility', 'none');
  //   }
  //   // return layer;
  //   // });
  // }

  constructor(props) {
    super(props);
    this.state = {
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

    // const geoJSON = this.createJSONObjs();

    // const valMin = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMin;
    // const valMax = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMax;
    // const dotMin = 10;
    // const dotMax = 40;

    map.on('style.load', () => {
      const renderedLayers = Object.keys(this.props.mapSelections).map((layer) => {
        if (layer !== 'pts') {
          console.log('layer', layer);
          return this.renderExistingLayers(layer);
        }
        return '';
      });
      this.setState({
        map,
        renderedLayers,
      });
    });
  }

  componentDidUpdate() {
    // const geoJSON = this.createJSONObjs();

    // this.state.map.getSource('pts').setData(geoJSON.sourceGeojson);
    // this.state.map.getSource('building-shapes').setData(geoJSON.sourceBuildingGeojson);
    // this.setLayerVisibility(this.props.mapSelections);

    // this.moveBoundingBox(geoJSON.sourceGeojson);
  }
  // componentWillReceiveProps()
  componentWillUnmount() {
    this.map.remove();
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


  renderExistingLayers(layer) {
    // console.log('layer rendering');
    return (
      <QlikObject
        key={layer}
        qProp={qProps[layer]}
        type="qListObject"
        Component={MapExistingLayers}
        // qPage={mapComponents}
        componentProps={{
          layerName: layer,
          visibilityState: this.props.mapSelections[layer],
          map: this.state.map,
          fieldName: layerFieldNameMap[layer],
        }}
      />
    );
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
    const mapComponents = {
      qTop: 0, qLeft: 0, qWidth: 7, qHeight: 1000,
    };

    return (
      <div style={style} ref={(el) => { this.mapContainer = el; }}>
        <QlikObject
          qProp={qProps.properties}
          type="qHyperCube"
          Component={MapNewLayers}
          qPage={mapComponents}
          componentProps={{
            makeSelections: this.makeSelections,
            map: this.state.map,
            mapSelections: this.props.mapSelections,
          }}
        />
        {this.state.renderedLayers}
      </div>
    );
  }
}
