import React from 'react';
import PropTypes from 'prop-types';
import bbox from '@turf/bbox';
import { lineString } from '@turf/helpers';

export default class MapNewLayers extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    mapSelections: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      map: this.props.map,
    };
  }

  componentDidMount() {
    console.log('map data', this.props, 'layout', this.props.qLayout, 'sel', this.props.mapSelections);

    const geoJSON = this.createJSONObjs();

    const { map } = this.state;

    const valMin = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMin;
    const valMax = this.props.qLayout.qHyperCube.qMeasureInfo[0].qMax;
    const dotMin = 10;
    const dotMax = 40;

    // map.on('style.load', () => {
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
    // this.setState({ map });

    // this.props.setLayerVisibility(this.props.mapSelections);
    this.moveBoundingBox(geoJSON.sourceGeojson);
    // });
    this.setLayerVisibility('pts');
    this.makeSelections('pts', 'OBJECTID');

    // Object.keys(this.props.mapSelections).map((layer) => {
    //   this.makeSelections(layer, 'OBJECTID');
    //   return true;
    // });
  }

  componentDidUpdate() {
    const geoJSON = this.createJSONObjs();


    // console.log('geoJSON', geoJSON, this.state.map);

    this.state.map.getSource('pts').setData(geoJSON.sourceGeojson);
    this.state.map.getSource('building-shapes').setData(geoJSON.sourceBuildingGeojson);

    this.setLayerVisibility('pts');

    this.moveBoundingBox(geoJSON.sourceGeojson);
  }
  componentWillUnmount() {
    // this.map.remove();
  }

  setLayerVisibility(layer) {
    // Object.keys(mapSelections).map((layer) => {
    console.log('called props', this.props.mapSelections, layer);
    // const visibility = this.state.map.getLayoutProperty(layer, 'visibility');
    // console.log('visibility', visibility);
    if (this.props.mapSelections[layer]) {
      this.state.map.setLayoutProperty(layer, 'visibility', 'visible');
    } else {
      this.state.map.setLayoutProperty(layer, 'visibility', 'none');
    }
    // return layer;
    // });
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
