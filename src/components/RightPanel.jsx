import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import BarChart from '../charts/BarChart';
import QlikObject from './QlikObject';
import qProps from '../qProps';

const hcProps = {
  qTop: 0, qLeft: 0, qWidth: 3, qHeight: 2000,
};

const chartOptions = {
  emitters: {
    sort: -1,
  },
  reductions: {
    sort: 1,
    refline: 0.15,
  },
  reductionAmount: {
    sort: -1,
  },
};

const dividerStyle = {
  marginTop: '10px',
  marginBottom: '10px',
};

export default class RightPanel extends React.Component {
  static propTypes = {
    // qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    // select: PropTypes.func.isRequired,
  };

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
  levelOfChartOp() {
    const { qDimensionsInfo } = this.props.qLayout.qListObject;
    console.log('listobj', qDimensionsInfo);
    return this.highLevelCharts();
    // return qDimensionsInfo.qStateCounts.qOption > 1 ? this.highLevelCharts() : '';
  }


  highLevelCharts() {
    console.log('now hear this', this.props.qLayout);
    // const { qStateCounts } = this.props.qLayout.qListObject.qDimensionsInfo;
    return (
      <Card>
        <CardContent>
          {/* <p>{qStateCounts.qOption} Options</p> */}
          <Typography variant="subheading" gutterBottom align="center">
            Largest Emitting Properties
          </Typography>
          <QlikObject
            qProp={qProps.propertyEmissions}
            type="qHyperCube"
            Component={BarChart}
            qPage={hcProps}
            componentProps={{
              options: chartOptions.emitters,
            }}
          />
          <Divider style={dividerStyle} />
          <Typography variant="subheading" gutterBottom align="center">
            Closest to 15% Reduction
          </Typography>
          <QlikObject
            qProp={qProps.nearEmissionReductTarget}
            type="qHyperCube"
            Component={BarChart}
            qPage={hcProps}
            componentProps={{
              options: chartOptions.reductions,
            }}
          />
          <Divider style={dividerStyle} />
          <Typography variant="subheading" gutterBottom align="center">
            Largest Reductions
          </Typography>
          <QlikObject
            qProp={qProps.propertyEmissionReductions}
            type="qHyperCube"
            Component={BarChart}
            qPage={hcProps}
            componentProps={{
              options: chartOptions.reductionAmount,
            }}
          />
        </CardContent>
      </Card>
    );
  }


  render() {
    return (
      <div>
        {this.levelOfChartOp()}
      </div>
    );
  }
}
