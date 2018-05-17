import React from 'react';
import PropTypes from 'prop-types';
// import * as c3 from 'c3';
// import * as d3 from 'd3';
// import '../../node_modules/c3/c3.css';
// import '../styles/chartStyles.css';
import picasso from 'picasso.js';

export default class BarChartPicasso extends React.Component {
  static propTypes = {
    // options: PropTypes.object.isRequired,
    qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    // select: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
    //   qDataHash: {},
    };
  }

  componentDidMount() {
    // console.log('map data', this.props, this.props.qData);
    const { qData, qLayout } = this.props;

    const data = () => {
      const arr = [
        ['Month', 'Sales'],
      ];

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      for (let m = 0; m < months.length; m += 1) {
        arr.push([
          months[m],
          parseFloat((Math.random() * 10000).toFixed(0)),
        ]);
      }
      return [{
        type: 'matrix',
        data: arr,
      }];
    };
    console.log('picasso', qData, qLayout, this.chartRef, data());

    picasso.chart({
      element: this.chartRef,
      data: data(),
      settings: {
        scales: {
          y: {
            data: { field: 'Sales' },
            include: [0],
          },
          c: {
            data: { field: 'Sales' },
            type: 'color',
          },
          t: { data: { extract: { field: 'Month' } }, padding: 0.3 },
        },
        components: [{
          type: 'axis',
          dock: 'left',
          scale: 'y',
        }, {
          type: 'axis',
          dock: 'bottom',
          scale: 't',
        }, {
          key: 'bars',
          type: 'box',
          data: {
            extract: {
              field: 'Month',
              props: {
                start: 0,
                end: { field: 'Sales' },
              },
            },
          },
          settings: {
            major: { scale: 't' },
            minor: { scale: 'y' },
            orientation: 'horizontal',
            box: {
              fill: { scale: 'c', ref: 'end' },
            },
          },
        }],
      },
    });
  }
  componentDidUpdate() {
    // console.log('updated props', this.props, this.state.chart);
  }

  componentWillUnmount() {
    this.chartRef.remove();
  }


  render() {
    const style = {
      height: '150px',
      width: '100%',
    };
    return <div style={style} ref={(el) => { this.chartRef = el; }} />;
  }
}
