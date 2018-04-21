import React from 'react';
import PropTypes from 'prop-types';

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
