import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3-format';
import bbox from '@turf/bbox';
import centroid from '@turf/centroid';
import { lineString, polygon, multiPolygon } from '@turf/helpers';


export default class MapNewLayers extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    select: PropTypes.func.isRequired,
    mapSelections: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    options: PropTypes.object.isRequired,
    colorSelection: PropTypes.string.isRequired,
    popup: PropTypes.object.isRequired,
  };
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   // console.log('called props', nextProps, prevState);

  //   const { qStateCounts } = nextProps.qLayout.qHyperCube.qDimensionInfo[0];
  //   // const { options } = nextProps;

  //   console.log('called props', nextProps.options.layerName, qStateCounts.qSelected, prevState);
  //   // if ( qStateCounts.qSelected > 1 && prevState.zoomed!==true ) {
  //   //   return { zoomed: true };
  //   // } else if (nextProps.zoomProps.defaultZoom)
  //   // selected but not previously selected, zoom it
  //   // default zoom to all
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
        dotMin: 20,
        dotMax: 50,
        minHex: '#aaa',
        maxHex: '#aaa',
      },
    };
  }

  componentDidMount() {
    const geoJSON = this.createJSONObj();

    const { colorVals } = this.state;
    const {
      map, options, qLayout, colorSelection,
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
          property: colorSelection,
          stops: [
            [colorVals.valMin, colorVals.minHex],
            [colorVals.valMax, colorVals.maxHex],
          ],
        },
        'circle-opacity': options.color.opacity || 0.8,
        'circle-radius': 5,
      };
    } else if (options.type === 'fill') {
      paintVal = {
        'fill-color': {
          property: colorSelection,
          stops: [
            [colorVals.valMin, colorVals.minHex],
            [colorVals.valMax, colorVals.maxHex],
          ],
        },
        'fill-opacity': options.color.opacity || 0.4,
        'fill-outline-color': colorVals.border,

      };
    } else if (options.type === 'heatmap') {
      paintVal = {
        // Increase the heatmap weight based on frequency and property magnitude
        'heatmap-weight': [
          'interpolate',
          ['linear'],
          ['get', colorSelection],
          colorVals.valMin, 0,
          colorVals.valMax, 1,
        ],
        // Increase the heatmap color weight weight by zoom level
        // heatmap-intensity is a multiplier on top of heatmap-weight
        'heatmap-intensity': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 1,
          9, 3,
        ],
        // Color ramp for heatmap.  Domain is 0 (low) to 1 (high).
        // Begin color ramp at 0-stop with a 0-transparancy color
        // to create a blur-like effect.
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0, colorVals.minHex,
          1, colorVals.maxHex,
        ],
        // Adjust the heatmap radius by zoom level
        'heatmap-radius': [
          'interpolate',
          ['linear'],
          ['zoom'],
          0, 2,
          9, 20,
        ],
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

    if (options.moveBbox) {
      this.moveBoundingBox(geoJSON);
    }
    // neighborhoods

    this.setLayerVisibility(options.layerName);

    if (options.enableSelection) {
      this.makeSelections(options.layerName, 0);
    }
  }

  // shouldComponentUpdate(nextProps) {
  //   console.log('checking for updates', this.props.mapSelections,
  // nextProps.mapSelections, this.state.mapSelections);
  //   return true;
  //   // (
  //   //   (JSON.stringify(this.props.mapSelections) !== JSON.stringify(nextProps.mapSelections))
  //   //   ||
  //   //   (JSON.stringify(this.props.qData) !== JSON.stringify(nextProps.qData))
  //   // );
  // }

  componentDidUpdate() {
    // prevProps, prevState
    // console.log('update called', this.props);

    const { colorVals } = this.state;
    const {
      map, options, qLayout, colorSelection,
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

    const { qStateCounts } = this.props.qLayout.qHyperCube.qDimensionInfo[0];
    // console.log('qStateCounts', qStateCounts);
    if (options.type === 'heatmap' && (qStateCounts.qSelected > 1 || qStateCounts.qOption > 1)) {
      map.setPaintProperty(options.layerName, 'heatmap-weight', [
        'interpolate',
        ['linear'],
        ['get', colorSelection],
        colorVals.valMin, 0,
        colorVals.valMax, 1,
      ]);
    } else {
      map.setPaintProperty(options.layerName, options.type === 'fill' ? 'fill-color' : 'circle-color', {
        property: colorSelection,
        stops: [
          [colorVals.valMin, colorVals.minHex],
          [colorVals.valMax, colorVals.maxHex],
        ],
      });
    }
    // map.setPaintProperty(options.layerName,
    // options.type === 'fill' ? 'fill-color' : 'circle-color', {
    //   property: colorSelection,
    //   stops: [
    //     [colorVals.valMin, colorVals.minHex],
    //     [colorVals.valMax, colorVals.maxHex],
    //   ],
    // });
    this.setLayerVisibility(options.layerName);

    if (options.moveBbox) {
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
  getCentroid(feature, polygonType) {
    let turfPolygon = {};
    if (this) {
      turfPolygon = polygonType === 'Polygon' ? polygon(feature) : multiPolygon(feature);
      // console.log('polygon', turfPolygon, centroid(turfPolygon));
    }
    return centroid(turfPolygon).geometry.coordinates;
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
  makeSelections(layer, fieldNo) {
    this.state.map.on('click', layer, (e) => {
      this.props.select(Number(e.features[0].properties.qElemNumber), Number(fieldNo));
    });

    // Change the cursor to a pointer when the mouse is over the places layer.
    this.state.map.on('mouseenter', layer, (e) => {
      this.state.map.getCanvas().style.cursor = 'pointer';

      const { qHyperCube } = this.props.qLayout;
      const { geometry, properties } = e.features[0];

      const coordinates = geometry.type === 'Polygon' || geometry.type === 'MultiPolygon' ?
        this.getCentroid(geometry.coordinates, geometry.type) :
        geometry.coordinates.slice();
      const description = `${qHyperCube.qDimensionInfo[0].qFallbackTitle}: <b>${properties.dim}</b> <br />
      ${qHyperCube.qMeasureInfo[0].qFallbackTitle}: <b>${d3.format(',.1f')(properties.metric1) || 0}</b> <br />
      ${qHyperCube.qMeasureInfo[1].qFallbackTitle}: <b>${d3.format(',.1f')(properties.metric2) || 0}</b> <br />
      ${qHyperCube.qMeasureInfo[2].qFallbackTitle}: <b>${d3.format(',.1f')(properties.metric3) || 0}</b> <br />
      ${qHyperCube.qMeasureInfo[3].qFallbackTitle}: <b>${d3.format(',.1f')(properties.metric4) || 0}</b> <br />
      ${qHyperCube.qMeasureInfo[4].qFallbackTitle}: <b>${d3.format(',.1f')(properties.metric5) || 0}</b> <br />
      ${qHyperCube.qMeasureInfo[5].qFallbackTitle}: <b>${(properties.metric6) || 0}</b>`;

      // console.log('coords', coordinates, e.features[0], qHyperCube);

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      // Populate the popup and set its coordinates
      // based on the feature found.
      this.props.popup.setLngLat(coordinates)
        .setHTML(description)
        .addTo(this.state.map);
    });

    // Change it back to a pointer when it leaves.
    this.state.map.on('mouseleave', layer, () => {
      this.state.map.getCanvas().style.cursor = '';
      this.props.popup.remove();
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
          type: options.type === 'circle' || options.type === 'heatmap' ?
            'Point' : 'MultiPolygon',
          coordinates: options.type === 'circle' || options.type === 'heatmap' ?
            [JSON.parse(d[1].qText)[0], JSON.parse(d[1].qText)[1]] : JSON.parse(d[1].qText),
        },
        properties: {
          dim: d[0].qText,
          qElemNumber: d[0].qElemNumber,
          metric1: d[2].qNum,
          metric2: d[3].qNum,
          metric3: d[4].qNum,
          metric4: d[5].qNum,
          metric5: d[6].qNum,
          metric6: d[7].qNum,
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
