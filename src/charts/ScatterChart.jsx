import React from 'react';
import PropTypes from 'prop-types';
import * as c3 from 'c3';
import * as d3 from 'd3';
import '../../node_modules/c3/c3.css';
import '../styles/chartStyles.css';

export default class ScatterChart extends React.Component {
  static propTypes = {
    options: PropTypes.object.isRequired,
    qData: PropTypes.object.isRequired,
    // qLayout: PropTypes.object.isRequired,
    // select: PropTypes.func.isRequired,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('chart props', nextProps, prevState.chart);
    let { chart } = prevState;
    const { chartProps } = prevState;
    const { options } = nextProps;
    if (chart) {
      // console.log('update chart', nextProps, chart);
      const { qMatrix } = nextProps.qData;
      const qElemNumMap = {};
      const jsonData = qMatrix.map((row) => {
        qElemNumMap[row[0].qText] = row[0].qElemNumber;
        return {
          id: row[0].qElemNumber,
          indicator: row[0].qText,
          total: row[options.measureNum].qNum.toFixed(options.numFormat.decimals),
        };
      });
      jsonData.sort((a, b) => (options.sort === -1 ? (b.total - a.total) : (a.total - b.total)));
      // jsonData.sort((a, b) => (b.total - a.total));
      const topJsonData = jsonData.slice(0, 5);
      // console.log('data to load', topJsonData, jsonData);
      // chart.load({
      //   json: jsonData,
      //   unload: missingChartIds,
      // });
      chartProps.data.json = topJsonData;

      chart = c3.generate(chartProps);
      return { chart, chartProps };
    }
    return null;
  }

  constructor(props) {
    super(props);
    this.state = {
    //   qDataHash: {},
    };
  }

  componentDidMount() {
    // console.log('map data', this.props, this.props.qData);
    const { qData, options } = this.props;
    const qElemNumMap = {};
    const jsonData = qData.qMatrix.map((row) => {
      qElemNumMap[row[0].qText] = row[0].qElemNumber;
      // console.log('row', row);
      return {
        id: row[0].qElemNumber,
        indicator: row[0].qText,
        total: row[options.measureNum].qNum.toFixed(options.numFormat.decimals),
      };
    });
    // console.log('json', jsonData, 'matrix', qData);
    jsonData.sort((a, b) => (options.sort === -1 ? (b.total - a.total) : (a.total - b.total)));
    const topJsonData = jsonData.slice(0, 5);

    // console.log('topJsonData', topJsonData, 'jsonDatasort', jsonData);

    const chartProps = {
      bindto: this.chartRef,
      size: {
        height: 400,
      },
      data: {
        type: 'scatter',
        json: topJsonData,
        keys: {
          x: 'indicator',
          value: ['total'],
        },
        labels: true,
      },
      axis: {
        x: {
          type: 'category',
        },
        rotated: true,
      },
      legend: {
        show: false,
      },
      transition: {
        duration: 1500,
      },
    };

    // var chart = c3.generate({
    //   data: {

    //   json: [
    //     {name: 'www.site1.com', upload: 200, download: 200, total: 400},
    //     {name: 'www.site2.com', upload: 100, download: 300, total: 400},
    //     {name: 'www.site3.com', upload: 300, download: 200, total: 500},
    //     {name: 'www.site4.com', upload: 400, download: 100, total: 500}
    //   ],
    //   keys: {
    //     x: 'name', // it's possible to specify 'x' when category axis
    //     value: ['total']
    //   },
    //       type: 'scatter'
    //   },
    //   axis: {
    //       x: {
    //           label: 'Sepal.Width',
    //           tick: {
    //               fit: false
    //           },
    //           type: 'category',
    //       },
    //       y: {
    //           label: 'Petal.Width'
    //       },
    //       rotated: true,
    //   }
    // });

    if (options.refline) chartProps.grid = options.refline;
    if (options.color) chartProps.color = options.color;
    if (options.numFormat.format) {
      chartProps.data.labels = {
        format: d3.format('.2%'),
      };
    }
    if (options.height) chartProps.size.height = options.height;
    if (options.axis) chartProps.axis.x = options.axis.x || chartProps.axis.x;


    const chart = c3.generate(chartProps);

    // d3.selectAll('.tick')
    //   .on('click', (value, index) => {
    //     // console.log(this);
    //     // console.log([value, index]);
    //   });
    /* eslint-disable react/no-did-mount-set-state */
    /* eslint-disable react/no-unused-state */
    this.setState({
      chart,
      chartProps,
    });
  }
  componentDidUpdate() {
    // console.log('updated props', this.props, this.state.chart);
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
