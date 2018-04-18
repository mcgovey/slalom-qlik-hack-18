import React from 'react';
import PropTypes from 'prop-types';
import bbox from '@turf/bbox';
import { lineString } from '@turf/helpers';

// const layerOptions = {
//   pts: {
//     layerName: 'pts',
//     type: 'circle',
//     enableSelection: false,
//   },
//   'building-shapes': {
//     layerName: 'building-shapes',
//     color: {
//       measureNum: 0,
//       minHex: '#000',
//       maxHex: '#fff',
//     },
//     type: 'fill',
//     enableSelection: true,
//   },
//   neighborhoods: {
//     layerName: 'neighborhoods',
//     color: {
//       measureNum: 0,
//       minHex: '#000',
//       maxHex: '#fff',
//     },
//     type: 'fill',
//     moveBbox: {
//       type: 'multipolygon',
//     },
//     enableSelection: true,
//   },
// };

export default class MapNewLayers extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    select: PropTypes.func.isRequired,
    mapSelections: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(nextProps) {
    console.log('exist layer props', nextProps);

    if (nextProps.map) {
      console.log('map drawn', nextProps);
      // const { map, layerName, visibilityState } = nextProps;
      // // console.log('map drawn', map, layerName, visibilityState);
      // map.setLayoutProperty(layerName, 'visibility', visibilityState ? 'visible' : 'none');
      // map.setPaintProperty(layerName, 'circle-radius', {
      //   property: 'metric',
      //   stops: [
      //     [valMin, '#fff'],
      //     [valMax, '#000']
      //   ]
      // });
    }
    return nextProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      map: this.props.map,
      colorVals: {
        valMin: 0,
        valMax: 10,
        dotMin: 10,
        dotMax: 40,
      },
    };
  }

  componentDidMount() {
    const geoJSON = this.createJSONObj();

    const { map, colorVals } = this.state;
    const { options, qLayout } = this.props;

    console.log('geoJSON', options, geoJSON);

    if (options.color) {
      colorVals.valMin = qLayout.qHyperCube.qMeasureInfo[options.color.measureNum].qMin;
      colorVals.valMax = qLayout.qHyperCube.qMeasureInfo[options.color.measureNum].qMax;
      colorVals.dotMin = options.color.dotMin || colorVals.dotMin;
      colorVals.dotMax = options.color.dotMax || colorVals.dotMax;
    }
    // const valMin = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMin;
    // const valMax = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMax
    // const dotMin = 10;
    // const dotMax = 40;

    // Add a data source
    map.addSource(options.layerName, {
      type: 'geojson',
      data: geoJSON,
    });

    let paintVal;
    if (options.type === 'circle') {
      paintVal = {
        'circle-color': '#ffffff',
        'circle-opacity': 1,
        'circle-radius': {
          property: 'colorByMeasure',
          stops: [
            [colorVals.valMin, colorVals.dotMin],
            [colorVals.valMax, colorVals.dotMax],
          ],
        },
      };
    } else if (options.type === 'fill') {
      paintVal = {
        'fill-color': '#fff',
        'fill-opacity': 0.8,
      };
    }

    // Add a layer
    map.addLayer({
      id: options.layerName,
      source: options.layerName,
      type: options.type,
      minzoom: options.minZoom || 0,
      maxzoom: options.maxZoom || 22,
      layout: {},
      paint: paintVal,
    });

    // will need to add logic for polygons
    if (options.moveBbox) {
      this.moveBoundingBox(geoJSON);
    }

    this.setLayerVisibility(options.layerName);

    if (options.enableSelection) {
      this.makeSelections('building-shapes', 0);
    }
  }

  componentDidUpdate() {
    const geoJSON = this.createJSONObj();

    const { map } = this.state;
    const { options } = this.props;

    console.log('geoJSON', options.layerName, geoJSON);

    map.getSource(options.layerName).setData(geoJSON);

    // will need to add logic for polygons
    if (options.moveBbox) {
      this.moveBoundingBox(geoJSON);
    }

    this.setLayerVisibility(options.layerName);
  }
  componentWillUnmount() {
    // this.map.remove();
  }

  setLayerVisibility(layer) {
    if (this.props.mapSelections[layer]) {
      this.state.map.setLayoutProperty(layer, 'visibility', 'visible');
    } else {
      this.state.map.setLayoutProperty(layer, 'visibility', 'none');
    }
  }

  moveBoundingBox(sourceGeojson) {
    if (sourceGeojson.features.length > 1) {
      const pts = sourceGeojson.features.map(d => d.geometry.coordinates);
      const line = lineString(pts);
      const bound = bbox(line);
      // console.log('bounding box', this.state.map, bound);

      this.props.map.fitBounds([
        [bound[0], bound[1]],
        [bound[2], bound[3]],
      ], { padding: 50 });
    } else if (sourceGeojson.features.length === 1) {
      this.props.map.flyTo({
        center: sourceGeojson.features[0].geometry.coordinates,
        zoom: 15,
      });
    }
  }
  makeSelections(layer, fieldNo) {
    this.state.map.on('click', layer, (e) => {
      this.props.select(Number(e.features[0].properties.qElemNumber), Number(fieldNo));
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

  createJSONObj() {
    const { qData, options } = this.props;

    const featureData = qData.qMatrix.filter(d => d[1].qText !== '-');

    // Build the geojson based on your data
    const sourceGeojson = {
      type: 'FeatureCollection',
      features: featureData.map(d => ({
        type: 'Feature',
        geometry: {
          type: options.type === 'circle' ? 'Point' : 'MultiPolygon',
          coordinates: options.type === 'circle' ? [JSON.parse(d[1].qText)[0], JSON.parse(d[1].qText)[1]] : JSON.parse(d[1].qText),
        },
        properties: {
          dim: d[0].qText,
          qElemNumber: d[0].qElemNumber,
          colorByMeasure: d[2].qNum,
          // metric: d[3].qNum,
        },
      })),
    };

    return sourceGeojson;
  }

  render() {
    // const style = {
    //   // position: 'absolute',
    //   top: 0,
    //   bottom: 0,
    //   height: 600,
    //   width: '100%',
    //   textAlign: 'left',
    // };

    return <div />;
  }
}
