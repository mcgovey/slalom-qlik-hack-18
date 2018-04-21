import React from 'react';
import PropTypes from 'prop-types';

export default class MapNewLayers extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    // qLayout: PropTypes.object.isRequired,
    map: PropTypes.object.isRequired,
    // visibilityState: PropTypes.bool.isRequired,
    layerName: PropTypes.string.isRequired,
    dataType: PropTypes.string.isRequired,
    select: PropTypes.func.isRequired,
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
    this.state.map.on('click', layer, (e) => {
      // var features = map.queryRenderedFeatures(e.point);
      console.log('features clicked', e.features[0], 'num', Number(fieldNo), 'hash', this.state.qDataHash[e.features[0].properties.Name], 'hashtable', this.state.qDataHash, 'lookup', e.features[0].properties.Name);
      if (this.props.dataType === 'qHyperCube') {
        this.props.select(
          Number(this.state.qDataHash[e.features[0].properties.Name]),
          Number(fieldNo),
        );
      } else {
        this.props.select(Number(this.state.qDataHash[e.features[0].properties.Name]));
      }
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
