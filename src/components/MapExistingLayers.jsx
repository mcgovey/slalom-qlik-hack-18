import React from 'react';
import PropTypes from 'prop-types';
import centroid from '@turf/centroid';
import { polygon, multiPolygon } from '@turf/helpers';

const seaLevelNames = {
  'fiveft-plus-sea-level-rise': '5 ft.',
  'sevenptfiveft-plus-sea-level-rise': '7.5 ft.',
  'nine-inch-sea-level-rise': '9 in.',
  'thirtysix-inch-sea-level-rise': '36 in.',
};

export default class MapNewLayers extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    // qLayout: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    // visibilityState: PropTypes.bool.isRequired,
    layerName: PropTypes.string.isRequired,
    dataType: PropTypes.string.isRequired,
    select: PropTypes.func.isRequired,
    popup: PropTypes.object.isRequired,
  };

  static getDerivedStateFromProps(nextProps) {
    // console.log('exist layer props', nextProps);

    if (nextProps.map) {
      // console.log('map drawn', nextProps);
      const { map, layerName, visibilityState } = nextProps;
      // console.log('map drawn', map, layerName, visibilityState);
      map.setLayoutProperty(layerName, 'visibility', visibilityState ? 'visible' : 'none');
      return { map: nextProps.map };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
      map: this.props.map,
      qDataHash: {},
    };
  }

  componentDidMount() {
    // console.log('map data', this.props);
    const { layerName } = this.props;
    this.writeToHashObj();
    // console.log('layer mounted', layerName, this.state.qDataHash);
    this.makeSelections(layerName);
  }

  componentWillUnmount() {
    // this.map.remove();
  }
  getCentroid(feature, polygonType) {
    let turfPolygon = {};
    if (this) {
      turfPolygon = polygonType === 'Polygon' ? polygon(feature) : multiPolygon(feature);
      // console.log('polygon', turfPolygon, centroid(turfPolygon));
    }
    return centroid(turfPolygon).geometry.coordinates;
  }

  writeToHashObj() {
    const dataMap = {};
    this.props.qData.qMatrix.map((row) => {
      if (row[0].qText) {
        dataMap[row[0].qText] = row[0].qElemNumber;
      }
      return true;
    });
    this.setState({ qDataHash: dataMap });

    return dataMap;
  }

  makeSelections(layer, fieldNo = 0) {
    // console.log('map', map);
    const { map } = this.state;
    map.on('click', layer, (e) => {
      // var features = map.queryRenderedFeatures(e.point);
      console.log('features clicked', e.features[0], 'num', Number(fieldNo), 'hash', this.state.qDataHash[e.features[0].properties.Name], 'hashtable', this.state.qDataHash, 'lookup', e.features[0].properties.Name);
      if (this.props.dataType === 'qHyperCube') {
        this.props.select(
          layer === 'sea-level-rise' ?
            Number(this.state.qDataHash[seaLevelNames[e.features[0].properties.source]]) : 1,
          Number(fieldNo),
        );
      } else {
        this.props.select(layer === 'sea-level-rise' ?
          Number(this.state.qDataHash[seaLevelNames[e.features[0].properties.source]]) : 1);
      }
    });


    // Change the cursor to a pointer when the mouse is over the places layer.
    map.on('mouseenter', layer, (e) => {
      this.state.map.getCanvas().style.cursor = 'pointer';
      console.log('hover', e, e.features[0].lngLat, this.state.qDataHash, this.state.qDataHash[seaLevelNames[e.features[0].properties.source]], this.props.popup);

      // const { qHyperCube } = this.props.qLayout;
      // const { properties, lngLat } = e.features[0];

      const coordinates = [e.lngLat.lng, e.lngLat.lat];
      // const coordinates = geometry.type === 'Polygon' || geometry.type === 'MultiPolygon' ?
      //   this.getCentroid(geometry.coordinates, geometry.type) :
      //   geometry.coordinates.slice();
      const description = `<b>${e.features[0].properties.source}</b>`;

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
    map.on('mouseleave', layer, () => {
      this.state.map.getCanvas().style.cursor = '';
      this.props.popup.remove();
    });
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
