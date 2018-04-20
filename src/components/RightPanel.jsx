import React from 'react';
// import PropTypes from 'prop-types';
import BarChart from '../charts/BarChart';
import QlikObject from './QlikObject';
import qProps from '../qProps';

export default class RightPanel extends React.Component {
  // static propTypes = {
  //   // qData: PropTypes.object.isRequired,
  //   // qLayout: PropTypes.object.isRequired,
  //   // select: PropTypes.func.isRequired,
  // };

  // static getDerivedStateFromProps(nextProps) {
  //   console.log('exist layer props', nextProps);

  //   // if (nextProps.map) {
  //   //   // console.log('map drawn', nextProps);
  //   //   const { map, layerName, visibilityState } = nextProps;
  //   //   // console.log('map drawn', map, layerName, visibilityState);
  //   //   map.setLayoutProperty(layerName, 'visibility', visibilityState ? 'visible' : 'none');

  //   // }
  //   return nextProps;
  // }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     map: this.props.map,
  //     qDataHash: {},
  //   };
  // }


  render() {
    const hcProps = {
      qTop: 0, qLeft: 0, qWidth: 3, qHeight: 2000,
    };
    return (
      <div>
        <QlikObject
          qProp={qProps.propertyEmissions}
          type="qHyperCube"
          Component={BarChart}
          qPage={hcProps}
          // componentProps={{
          //   options: layerOptions[layer],
          //   map: this.state.map,
          //   mapSelections: this.props.mapSelections,
          // }}
        />
      </div>
    );
  }
}
