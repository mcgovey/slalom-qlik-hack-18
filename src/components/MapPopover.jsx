import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import Typography from 'material-ui/Typography';

export default class MapPopover extends React.Component {
  static propTypes = {
    features: PropTypes.object.isRequired,
    anchorEl: PropTypes.object.isRequired,
  };

  // static defaultProps = {
  //   features: null,
  //   anchorEl: null,
  // };

  //   static getDerivedStateFromProps(nextProps) {
  //     // console.log('exist layer props', nextProps);

  //     if (nextProps.map) {
  //       // console.log('map drawn', nextProps);
  //       const { map, layerName, visibilityState } = nextProps;
  //       // console.log('map drawn', map, layerName, visibilityState);
  //       map.setLayoutProperty(layerName, 'visibility', visibilityState ? 'visible' : 'none');
  //       return { map: nextProps.map };
  //     }
  //     return null;
  //   }

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    console.log('popover data', this.props, this.props.features);
  }

  componentDidUpdate() {
    console.log('popover data', this.props, this.props.features);
  }

  componentWillUnmount() {
    // this.map.remove();
  }


  render() {
    const open = !!this.props.anchorEl;

    return (
      <Popover
        open={open}
        anchorEl={this.props.anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        // onClose={this.handlePopoverClose}
        disableRestoreFocus
      >
        <Typography>I use Popover.</Typography>
      </Popover>
    );
  }
}
