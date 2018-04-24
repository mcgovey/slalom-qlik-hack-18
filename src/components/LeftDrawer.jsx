import React from 'react';
import PropTypes from 'prop-types';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import QlikObject from './QlikObject';
import QlikFilter from './QlikFilter';
import qProps from '../qProps';
import SelectionLayers from './SelectionLayers';
import SelectionColorDim from './SelectionColorDim';

class LeftDrawer extends React.Component {
  static propTypes = {
    drawerOpenState: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
    mapSelections: PropTypes.object.isRequired,
    changeMapLayer: PropTypes.func.isRequired,
    changeColorDim: PropTypes.func.isRequired,
    colorSelection: PropTypes.string.isRequired,
  }

  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: 0,
  //   };
  // }

  render() {
    // console.log('draw props', this.props, this.props.changeColorDim, this.props.colorSelection);
    return (
      <Drawer
        open={this.props.drawerOpenState}
        onClose={this.props.toggleDrawer('leftDrawer', false)}
      >
        <div
          tabIndex={0}
          role="button"
          // onClick={this.props.toggleDrawer('leftDrawer', false)}
          // onKeyDown={this.props.toggleDrawer('leftDrawer', false)}
        >
          <Typography variant="title" gutterBottom align="center">
            Selections
          </Typography>
          <Typography variant="subheading" gutterBottom align="center">
            Layer Selection
          </Typography>
          <SelectionLayers {...this.props} />
          <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
          <SelectionColorDim {...this.props} />
          <Divider style={{ marginTop: '10px', marginBottom: '10px' }} />
          <Typography variant="subheading" gutterBottom align="center">
            Filters
          </Typography>
          <QlikObject qProp={qProps.neighborhoodList} type="qListObject" Component={QlikFilter} />
          <QlikObject qProp={qProps.propertyTypeList} type="qListObject" Component={QlikFilter} />
          <QlikObject qProp={qProps.propertyUseList} type="qListObject" Component={QlikFilter} />
          <QlikObject qProp={qProps.cohortList} type="qListObject" Component={QlikFilter} />
          <QlikObject qProp={qProps.reductionStatusList} type="qListObject" Component={QlikFilter} />
        </div>
      </Drawer>
    );
  }
}


export default LeftDrawer;
