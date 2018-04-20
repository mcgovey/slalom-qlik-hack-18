import React from 'react';
import PropTypes from 'prop-types';
import * as c3 from 'c3';
import '../../node_modules/c3/c3.css';

export default class BarChart extends React.Component {
  static propTypes = {
    qData: PropTypes.object.isRequired,
    // qLayout: PropTypes.object.isRequired,
    // select: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log('chart props', nextProps, prevState.chart);
    let { chart } = prevState;
    const { chartOptions } = prevState;
    if (chart) {
      console.log('update chart', nextProps, chart);
      const { qMatrix } = nextProps.qData;
      const jsonData = qMatrix.map(row => ({
        // id: row[0].qText,
        indicator: row[0].qText,
        total: row[1].qNum,
      }));
      jsonData.sort((a, b) => b.total - a.total);
      const topJsonData = jsonData.slice(0, 5);
      console.log('data to load', topJsonData);
      // chart.load({
      //   json: jsonData,
      //   unload: missingChartIds,
      // });
      chart = c3.generate({
        bindto: chartOptions.ref,
        data: {
          type: 'bar',
          json: topJsonData,
          keys: {
            x: 'indicator',
            value: ['total'],
          },
        },
        axis: {
          x: {
            type: 'category',
          },
        },
        bar: {
          width: {
            ratio: 0.5,
          },
        },
      });
    }
    return chart || null;
  }

  constructor(props) {
    super(props);
    this.state = {
    //   qDataHash: {},
    };
  }

  componentDidMount() {
    console.log('map data', this.props, this.props.qData);
    const { qMatrix } = this.props.qData;
    const jsonData = qMatrix.map(row => ({
      indicator: row[0].qText,
      total: row[1].qNum,
    }));
    jsonData.sort((a, b) => b.total - a.total);
    const topJsonData = jsonData.slice(0, 5);

    console.log('json', jsonData, 'matrix', qMatrix);

    const chart = c3.generate({
      bindto: this.chartRef,
      data: {
        type: 'bar',
        json: topJsonData,
        keys: {
          x: 'indicator',
          value: ['total'],
        },
      },
      axis: {
        x: {
          type: 'category',
        },
      },
      bar: {
        width: {
          ratio: 0.5,
        },
      },
    });
    /* eslint-disable react/no-did-mount-set-state */
    /* eslint-disable react/no-unused-state */
    this.setState({
      chart,
      chartOptions: {
        ref: this.chartRef,
      },
    });
  }
  componentDidUpdate() {
    console.log('updated props', this.props, this.state.chart);
  }

  componentWillUnmount() {
    this.chartRef.remove();
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
    // ref={(el) => { this.chartRef = el; }}

    return <div ref={(el) => { this.chartRef = el; }} />;
  }
}
