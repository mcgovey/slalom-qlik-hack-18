import React from 'react';
import PropTypes from 'prop-types';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import BarChart from '../charts/BarChart';

const dividerStyle = {
  marginTop: '10px',
  marginBottom: '10px',
};

const chartOptions = {
  emissions: {
    height: 30,
    measureNum: 4,
    sort: -1,
    color: {
      pattern: ['#94b9af'],
    },
    numFormat: {
      decimals: 0,
    },
    axis: {
      x: {
        show: false,
      },
    },
  },
  consumption: {
    height: 30,
    measureNum: 5,
    sort: -1,
    color: {
      pattern: ['#94b9af'],
    },
    numFormat: {
      decimals: 0,
    },
    axis: {
      x: {
        show: false,
      },
    },
  },
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
    const { qData, qLayout } = this.props;
    console.log('property data', qData, qLayout);
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
        color: '#94b9af',
      },
    };
    const { qMatrix } = this.props.qData;
    console.log('matrix', qMatrix);
    return (

      <Card>
        <CardContent>
          <Typography variant="headline" style={styles.header} gutterBottom align="center">
            Property Name(s)
          </Typography>
          <Typography variant="body2" style={styles.data} gutterBottom align="center">
            {qMatrix[0][1].qText}
          </Typography>
          <Typography variant="headline" style={styles.header} gutterBottom align="center">
            Property Type
          </Typography>
          <Typography variant="body2" style={styles.data} gutterBottom align="center">
            {qMatrix[0][2].qText}
          </Typography>
          <Typography variant="headline" style={styles.header} gutterBottom align="center">
            Property Uses
          </Typography>
          <Typography variant="body2" style={styles.data} gutterBottom align="center">
            {qMatrix[0][3].qText}
          </Typography>
          <Divider style={dividerStyle} />
          <Typography variant="body2" style={styles.header} gutterBottom align="center">
            Emissions
          </Typography>
          <BarChart {...this.props} options={chartOptions.emissions} />
          <Typography variant="body2" style={styles.header} gutterBottom align="center">
            Consumption
          </Typography>
          <BarChart {...this.props} options={chartOptions.consumption} />
          <Typography variant="headline" style={styles.header} gutterBottom align="center">
            Energy Star Score
          </Typography>
          <Typography variant="body2" style={styles.data} gutterBottom align="center">
            {qMatrix[0][8].qText}
          </Typography>
          <Typography variant="headline" style={styles.header} gutterBottom align="center">
            Renewable Energy Generation
          </Typography>
          <Typography variant="body2" style={styles.data} gutterBottom align="center">
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
