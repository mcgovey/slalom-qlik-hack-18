import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import QlikObject from './QlikObject';
import QlikFilter from './QlikFilter';
import qProps from '../qProps';

class LeftDrawer extends React.Component {
  static propTypes = {
    openState: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: 0,
  //   };
  // }

  render() {
    return (
      <Drawer open={this.props.openState} onClose={this.props.toggleDrawer('leftDrawer', false)}>
        <div
          tabIndex={0}
          role="button"
          // onClick={this.props.toggleDrawer('leftDrawer', false)}
          // onKeyDown={this.props.toggleDrawer('leftDrawer', false)}
        >
          <h3>Filters</h3>
          <QlikObject qProp={qProps.neighborhoodList} type="qListObject" Component={QlikFilter} />
        </div>
      </Drawer>
    );
  }
}


export default LeftDrawer;
