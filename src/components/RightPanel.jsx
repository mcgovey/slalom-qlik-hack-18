import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import BarChart from '../charts/BarChart';
// import BarChartPicasso from '../charts/BarChartPicasso';
import QlikObject from './QlikObject';
import RightPanelPropertyInfo from './RightPanelPropertyInfo';
import qProps from '../qProps';

const hcProps = {
  qTop: 0, qLeft: 0, qWidth: 3, qHeight: 2000,
};

const chartObjs = {
  emitters: {
    height: 200,
    measureNum: 1,
    rotated: true,
    sort: -1,
    color: {
      pattern: ['#0072c8'],
    },
    numFormat: {
      decimals: 0,
      format: 'comma',
    },
  },
  yearOverYearChng: {
    height: 150,
    measureNum: 1,
    sort: -1,
    color: {
      pattern: ['#0072c8'],
    },
    numFormat: {
      decimals: 0,
      format: 'comma',
    },
  },
  // reductions: {
  //   height: 200,
  //   measureNum: 1,
  //   rotated: true,
  //   sort: 1,
  //   refline: {
  //     y: {
  //       lines: [
  //         { value: -0.15, text: '15%' },
  //       ],
  //     },
  //   },
  //   color: {
  //     pattern: ['#0072c8'],
  //   },
  //   numFormat: {
  //     decimals: 2,
  //     format: 'pct',
  //   },
  // },
  reductionAmount: {
    height: 200,
    measureNum: 1,
    rotated: true,
    sort: -1,
    color: {
      pattern: ['#0072c8'],
    },
    numFormat: {
      decimals: 0,
      format: 'comma',
    },
  },
};

const dividerStyle = {
  marginTop: '10px',
  marginBottom: '10px',
};

export default class RightPanel extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
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

  constructor(props) {
    super(props);
    this.state = {
      chartOptions: chartObjs,
    };
  }
  levelOfChartOp() {
    const { qDimensionInfo } = this.props.qLayout.qHyperCube;
    // console.log('listobjs', this.props.qData);
    return qDimensionInfo[0].qStateCounts.qSelected === 1 ?
      this.singleBuildingInfo() :
      this.highLevelCharts();
    // return qDimensionsInfo.qStateCounts.qOption > 1 ? this.highLevelCharts() : '';
  }
  singleBuildingInfo() {
    return (
      <RightPanelPropertyInfo
        {...this.props}
      />
    );
  }

  highLevelCharts() {
    const { chartOptions } = this.state;
    // const { qDimensionInfo } = this.props.qLayout.qHyperCube;
    // console.log('now hear this', this.props.qLayout, qDimensionInfo);
    return (
      <Card>
        <CardContent>
          {/* <QlikObject
            qProp={qProps.nearEmissionReductTarget}
            type="qHyperCube"
            Component={BarChartPicasso}
            qPage={hcProps}
            componentProps={{
              options: chartOptions.yearOverYearChng,
            }}
          /> */}
          <Typography variant="subheading" gutterBottom align="center">
            Emissions Trend
          </Typography>
          <QlikObject
            qProp={qProps.nearEmissionReductTarget}
            type="qHyperCube"
            Component={BarChart}
            qPage={hcProps}
            componentProps={{
              options: chartOptions.yearOverYearChng,
            }}
          />
          <Divider style={dividerStyle} />
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
