import React from 'react';
import PropTypes from 'prop-types';

export default class MapNewLayers extends React.Component {
  static propTypes = {
    // qData: PropTypes.object.isRequired,
    // qLayout: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    visibilityState: PropTypes.bool.isRequired,
    fieldName: PropTypes.string.isRequired,
    layerName: PropTypes.string.isRequired,
  };

  static getDerivedStateFromProps(nextProps) {
    console.log('exist layer props', nextProps);

    if (nextProps.map) {
      // console.log('map drawn', nextProps);
      const { map, layerName, visibilityState } = nextProps;
      console.log('map drawn', map, layerName, visibilityState);
      map.setLayoutProperty(layerName, 'visibility', visibilityState ? 'visible' : 'none');
    }
    return nextProps;
  }

  constructor(props) {
    super(props);
    this.state = {
      map: this.props.map,
    };
  }

  componentDidMount() {
    console.log('map data', this.props, this.props.fieldName, this.props.visibilityState, this.props.layerName);
    // const { map, layerName, visibilityState } = this.props;
    // map.setLayoutProperty(layerName, 'visibility', visibilityState ? 'visible' : 'none');

    // this.setLayerVisibility('pts');

    // const geoJSON = this.createJSONObjs();

    // const { map } = this.state;

    // const valMin = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMin;
    // const valMax = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMax;
    // const dotMin = 10;
    // const dotMax = 40;

    // // map.on('style.load', () => {
    // // console.log('style param', e);
    // // Add a data source
    // map.addSource('pts', {
    //   type: 'geojson',
    //   data: geoJSON.sourceGeojson,
    // });
    // map.addSource('building-shapes', {
    //   type: 'geojson',
    //   data: geoJSON.sourceBuildingGeojson,
    // });


    // // Add a layer
    // map.addLayer({
    //   id: 'pts',
    //   source: 'pts',
    //   type: 'circle',
    //   minzoom: 7,
    //   maxzoom: 12,
    //   layout: {},
    //   paint: {
    //     'circle-color': '#ffffff',
    //     'circle-opacity': 1,
    //     'circle-radius': {
    //       property: 'metric',
    //       stops: [
    //         [valMin, dotMin],
    //         [valMax, dotMax],
    //       ],
    //     },
    //   },
    // });

    // // Add a layer
    // map.addLayer({
    //   id: 'building-shapes',
    //   source: 'building-shapes',
    //   type: 'fill',
    //   minzoom: 12,
    //   layout: {},
    //   paint: {
    //     'fill-color': '#fff',
    //     'fill-opacity': 0.8,
    //   },
    // });
    // // this.setLayerState(this.state.layerState);
    // // this.setState({ map });

    // // this.props.setLayerVisibility(this.props.mapSelections);
    // this.moveBoundingBox(geoJSON.sourceGeojson);
    // });
    // this.setLayerVisibility('pts');

    // Object.keys(this.props.mapSelections).map((layer) => {
    //   this.makeSelections(layer, 'OBJECTID');
    //   return true;
    // });
  }

  componentDidUpdate() {
    // console.log('map data', this.props, this.props.visibilityState, this.props.fieldName);
    // const { map, layerName, visibilityState } = this.props;
    // map.setLayoutProperty(layerName, 'visibility', visibilityState ? 'visible' : 'none');
    // const geoJSON = this.createJSONObjs();


    // console.log('geoJSON', geoJSON, this.state.map);

    // this.state.map.getSource('pts').setData(geoJSON.sourceGeojson);
    // this.state.map.getSource('building-shapes').setData(geoJSON.sourceBuildingGeojson);

    // this.setLayerVisibility('pts', this.state.map);

    // this.moveBoundingBox(geoJSON.sourceGeojson);
  }
  componentWillUnmount() {
    // this.map.remove();
  }

  setLayerVisibility(visibility) {
    // Object.keys(mapSelections).map((layer) => {
    console.log('called props', visibility);
    // const visibility = this.state.map.getLayoutProperty(layer, 'visibility');
    // console.log('visibility', visibility);
    // if (this.props.mapSelections[layer]) {
    this.state.map.setLayoutProperty(this.props.layerName, 'visibility', this.props.visibilityState ? 'visible' : 'none');
    // } else {
    //   this.state.map.setLayoutProperty(layer, 'visibility', 'none');
    // }
    // return layer;
    // });
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
