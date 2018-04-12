import React from 'react';
// import PropTypes from 'prop-types';
// import Drawer from 'material-ui/Drawer';
import QlikObject from './QlikObject';
// import QlikFilter from './QlikFilter';
import QlikCurrentSelections from './QlikCurrentSelections';
import qProps from '../qProps';

class CurrentSelectionsBox extends React.Component {
  // static propTypes = {
  //   openState: PropTypes.bool.isRequired,
  //   toggleDrawer: PropTypes.func.isRequired,
  // }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: 0,
  //   };
  // }

  render() {
    console.log('being called');
    return (
      <div>
        <QlikObject qProp={qProps.sessionLists} type="expression" Component={QlikCurrentSelections} />
      </div>
    );
  }
}


export default CurrentSelectionsBox;
