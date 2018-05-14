import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import BarChart from '../charts/BarChart';
import QlikObject from './QlikObject';
import qProps from '../qProps';

const dividerStyle = {
  marginTop: '8px',
  marginBottom: '8px',
};

const chartOptions = {
  emissions: {
    height: 30,
    measureNum: 7,
    rotated: true,
    sort: -1,
    color: {
      pattern: ['#0072c8'],
    },
    numFormat: {
      decimals: 0,
      format: 'comma',
    },
    axis: {
      x: {
        show: false,
      },
    },
    comparison: {
      measureNum: 10,
      name: 'Neighborhood Avg',
      type: 'line',
      color: '#f2f3f4',
    },
  },
  consumption: {
    height: 30,
    measureNum: 6,
    rotated: true,
    sort: -1,
    color: {
      pattern: ['#0072c8'],
    },
    numFormat: {
      decimals: 0,
      format: 'comma',
    },
    axis: {
      x: {
        show: false,
      },
    },
    comparison: {
      measureNum: 11,
      name: 'Neighborhood Avg',
      type: 'line',
      color: '#f2f3f4',
    },
  },
  emissionsOverTime: {
    height: 60,
    measureNum: 1,
    sort: false,
    color: {
      pattern: ['#0072c8'],
    },
    numFormat: {
      decimals: 0,
      format: 'comma',
    },
  },
  consumptionOverTime: {
    height: 60,
    measureNum: 2,
    sort: false,
    color: {
      pattern: ['#0072c8'],
    },
    numFormat: {
      decimals: 0,
      format: 'comma',
    },
  },
};

const hcProps = {
  qTop: 0, qLeft: 0, qWidth: 3, qHeight: 12,
};
export default class MapNewLayers extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
  };

  // static getDerivedStateFromProps(nextProps) {
  //   console.log('exist layer props', nextProps);

  //   if (nextProps.map) {
  //     // console.log('map drawn', nextProps);
  //   }
  //   return nextProps;
  // }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    // const { qData, qLayout } = this.props;
    // console.log('property data', qData, qLayout);
  }

  componentWillUnmount() {
    // this.map.remove();
  }


  render() {
    const styles = {
      header: {
        color: '#f2f3f4',
      },
      data: {
        color: '#f2f3f4',
      },
    };
    const { qMatrix } = this.props.qData;
    // console.log('matrix', qMatrix);
    return (

      <Card>
        <CardContent>
          <Typography variant="body2" style={styles.header} gutterBottom align="center">
            Property Name(s)
          </Typography>
          <Typography variant="subheading" style={styles.data} gutterBottom align="center">
            {qMatrix[0][1].qText}
          </Typography>
          <Typography variant="body2" style={styles.header} gutterBottom align="center">
            Property Type
          </Typography>
          <Typography variant="subheading" style={styles.data} gutterBottom align="center">
            {qMatrix[0][2].qText}
          </Typography>
          <Typography variant="body2" style={styles.header} gutterBottom align="center">
            Property Uses
          </Typography>
          <Typography variant="subheading" style={styles.data} gutterBottom align="center">
            {qMatrix[0][3].qText}
          </Typography>
          <Divider style={dividerStyle} />
          <Typography variant="body2" style={styles.header} gutterBottom align="center">
            Emissions over time
          </Typography>
          <QlikObject
            qProp={qProps.objectHCTrend}
            type="qHyperCube"
            Component={BarChart}
            qPage={hcProps}
            componentProps={{
              options: chartOptions.emissionsOverTime,
            }}
          />
          <Typography variant="body2" style={styles.header} gutterBottom align="center">
            Consumption over time
          </Typography>
          <QlikObject
            qProp={qProps.objectHCTrend}
            type="qHyperCube"
            Component={BarChart}
            qPage={hcProps}
            componentProps={{
              options: chartOptions.consumptionOverTime,
            }}
          />
          <Divider style={dividerStyle} />
          <Typography variant="body2" style={styles.header} gutterBottom align="center">
            GHG Intensity vs. Peers
          </Typography>
          <BarChart {...this.props} options={chartOptions.emissions} />
          <Typography variant="body2" style={styles.header} gutterBottom align="center">
            Site EUI vs. Peers
          </Typography>
          <BarChart {...this.props} options={chartOptions.consumption} />
          <Typography variant="body2" style={styles.header} gutterBottom align="center">
            Energy Star Score
          </Typography>
          <Typography variant="subheading" style={styles.data} gutterBottom align="center">
            {qMatrix[0][8].qText}
          </Typography>
          <Typography variant="body2" style={styles.header} gutterBottom align="center">
            Renewable Energy Generation
          </Typography>
          <Typography variant="subheading" style={styles.data} gutterBottom align="center">
            {qMatrix[0][9].qText}
          </Typography>
          {/*
          <Typography variant="heading" gutterBottom align="center">
            {qMatrix[3].qText}
          </Typography> */}
        </CardContent>
      </Card>
    );
  }
}
