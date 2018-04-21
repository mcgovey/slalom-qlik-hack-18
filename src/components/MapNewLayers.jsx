import React from 'react';
import PropTypes from 'prop-types';
import bbox from '@turf/bbox';
import { lineString } from '@turf/helpers';


export default class MapNewLayers extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    select: PropTypes.func.isRequired,
    mapSelections: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    zoomLvl: PropTypes.number.isRequired,
    updateZoomLvl: PropTypes.func.isRequired,
  };
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // console.log('called props', nextProps, prevState);

  //   // const { qStateCounts } = nextProps.qLayout.qHyperCube.qDimensionInfo[0];
  //   // const { options } = nextProps;

  //   // console.log('called props', nextProps.options.layerName,
  //  qStateCounts.qSelected, nextProps.zoomLvl);
  //   // if (qStateCounts.qSelected === 1 && nextProps.zoomLvl === 1) {
  //   //   return {
  //   //     zoomLvl: 2,
  //   //   };
  //   // } else if (qStateCounts.qSelected !== 1 && nextProps.zoomLvl > 1) {
  //   //   return {
  //   //     zoomLvl: 1,
  //   //   };
  //   // } else if (!prevState.zoomLvl) {
  //   //   return {
  //   //     zoomLvl: nextProps.zoomLvl,
  //   //   };
  //   // }


  //   //   if (nextProps.map) {
  //   //     if (JSON.stringify(prevState.mapSelections) !==
  //   // JSON.stringify(nextProps.mapSelections)) {
  //   //       console.log('need a layer update', 'selections',
  //   // prevState.mapSelections, nextProps.mapSelections);
  //   //       return { mapSelections: nextProps.mapSelections };
  //   //     } else if (JSON.stringify(prevState.qData) !== JSON.stringify(nextProps.qData)) {
  //   //       console.log('need a data update');
  //   //       return { qData: nextProps.qData };
  //   //     } else if (JSON.stringify(prevState.map) !== JSON.stringify(nextProps.map)) {
  //   //       console.log('need a map update');
  //   //       return { map: nextProps.map };
  //   //     }
  //   //     console.log('map layer but no state updates');
  //   //   }
  //   return null;
  // }

  constructor(props) {
    super(props);
    this.state = {
      map: this.props.map,
      colorVals: {
        valMin: 0,
        valMax: 10,
        dotMin: 10,
        dotMax: 40,
        minHex: '#aaa',
        maxHex: '#aaa',
      },
    };
  }

  componentDidMount() {
    const geoJSON = this.createJSONObj();

    const { colorVals } = this.state;
    const {
      map, options, qLayout, mapSelections,
    } = this.props;

    if (options.color) {
      colorVals.valMin = qLayout.qHyperCube.qMeasureInfo[options.color.measureNum].qMin;
      colorVals.valMax = qLayout.qHyperCube.qMeasureInfo[options.color.measureNum].qMax;
      colorVals.dotMin = options.color.dotMin || colorVals.dotMin;
      colorVals.dotMax = options.color.dotMax || colorVals.dotMax;
      colorVals.minHex = options.color.minHex || colorVals.minHex;
      colorVals.maxHex = options.color.maxHex || colorVals.maxHex;
      colorVals.border = options.color.border || colorVals.maxHex;
    }

    // Add a data source
    map.addSource(options.layerName, {
      type: 'geojson',
      data: geoJSON,
    });

    let paintVal;
    if (options.type === 'circle') {
      paintVal = {
        'circle-color': {
          property: 'colorByMeasure',
          stops: [
            [colorVals.valMin, colorVals.minHex],
            [colorVals.valMax, colorVals.maxHex],
          ],
        },
        'circle-opacity': options.color.opacity || 0.8,
        'circle-radius': 2,
      };
    } else if (options.type === 'fill') {
      paintVal = {
        'fill-color': {
          property: 'colorByMeasure',
          stops: [
            [colorVals.valMin, colorVals.minHex],
            [colorVals.valMax, colorVals.maxHex],
          ],
        },
        'fill-opacity': options.color.opacity || 0.4,
        'fill-outline-color': colorVals.border,

      };
    }
    if (options.aboveLayer) {
      // Add a layer
      map.addLayer({
        id: options.layerName,
        source: options.layerName,
        type: options.type,
        minzoom: options.minZoom || 0,
        maxzoom: options.maxZoom || 22,
        layout: {},
        paint: paintVal,
      }, options.aboveLayer);
    } else {
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
    }


    if (options.moveBbox &&
      this.props.zoomLvl === options.moveBbox.zoomLvl &&
      mapSelections[options.layerName]) {
      this.moveBoundingBox(geoJSON);
    }

    this.setLayerVisibility(options.layerName);

    if (options.enableSelection) {
      this.makeSelections(options.layerName, 0, options.moveBbox.zoomLvl);
    }
  }

  shouldComponentUpdate(nextProps) {
    return (
      (JSON.stringify(this.props.mapSelections) !== JSON.stringify(nextProps.mapSelections))
      ||
      (JSON.stringify(this.props.qData) !== JSON.stringify(nextProps.qData))
    );
  }

  componentDidUpdate() {
    // prevProps, prevState
    // console.log('update called', this.props, this.state, prevProps, prevState);

    const { colorVals } = this.state;
    const {
      map, options, qLayout, mapSelections,
    } = this.props;

    // console.log('qLayout', qLayout);

    if (options.color) {
      colorVals.valMin = qLayout.qHyperCube.qMeasureInfo[options.color.measureNum].qMin;
      colorVals.valMax = qLayout.qHyperCube.qMeasureInfo[options.color.measureNum].qMax;
      colorVals.minHex = options.color.minHex || colorVals.minHex;
      colorVals.maxHex = options.color.maxHex || colorVals.maxHex;
    }

    const geoJSON = this.createJSONObj();

    // const { map } = this.state;
    // const { options, map } = this.props;

    map.getSource(options.layerName).setData(geoJSON);

    map.setPaintProperty(options.layerName, options.type === 'fill' ? 'fill-color' : 'circle-color', {
      property: 'colorByMeasure',
      stops: [
        [colorVals.valMin, colorVals.minHex],
        [colorVals.valMax, colorVals.maxHex],
      ],
    });
    this.setLayerVisibility(options.layerName);

    if (options.moveBbox &&
      this.props.zoomLvl === options.moveBbox.zoomLvl &&
      mapSelections[options.layerName]) {
      this.moveBoundingBox(geoJSON);
    }
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
    const { options } = this.props;
    if (sourceGeojson.features.length > 1 || options.type === 'fill') {
      const segs = sourceGeojson.features.map(d => d.geometry.coordinates);
      const line = options.type === 'circle' ? lineString(segs) : sourceGeojson;
      const bound = bbox(line);

      this.props.map.fitBounds([
        [bound[0], bound[1]],
        [bound[2], bound[3]],
      ], {
        padding: {
          top: 130, bottom: 50, left: 50, right: 230,
        },
      });
    } else if (sourceGeojson.features.length === 1) {
      this.props.map.flyTo({
        center: sourceGeojson.features[0].geometry.coordinates,
        zoom: 15,
      });
    }
  }
  makeSelections(layer, fieldNo, zoomLvl) {
    this.state.map.on('click', layer, (e) => {
      this.props.select(Number(e.features[0].properties.qElemNumber), Number(fieldNo));
      this.props.updateZoomLvl(zoomLvl);
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
