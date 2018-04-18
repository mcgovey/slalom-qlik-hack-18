import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import QlikObject from './QlikObject';
import QlikFilter from './QlikFilter';
import qProps from '../qProps';
import Mapbox from './Mapbox';
import LeftDrawer from './LeftDrawer';


const styles = {
  div: {
    display: 'flex',
    flexDirection: 'row wrap',
    padding: 20,
    width: '100%',
  },
  paperLeft: {
    flex: 4,
    height: 600,
    margin: 0,
    textAlign: 'center',
    padding: 0,
  },
  paperRight: {
    height: 600,
    flex: 1,
    marginLeft: 10,
    textAlign: 'center',
  },
};
// <Mapbox />

class PageOne extends React.Component {
  static propTypes = {
    drawerOpenState: PropTypes.bool.isRequired,
    toggleDrawer: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      mapSelections: {
        pts: false,
        'building-shapes': true,
        neighborhoods: true,
        'sea-level-rise': false,
        'groundwater-conversvation': false,
        'climate-ready-social-vulnerability': false,
        'city-council-districts': false,
      },
      mapLayerProps: {
        pts: {
          type: 'qHyperCube',
          selectionField: 'OBJECTID',
          builtBy: 'qlik',
        },
        'building-shapes': {
          type: 'qHyperCube',
          selectionField: 'OBJECTID',
          builtBy: 'qlik',
        },
        neighborhoods: {
          type: 'qHyperCube',
          selectionField: 'Neighborhood',
          builtBy: 'qlik',
        },
        'sea-level-rise': {
          type: 'qListObject',
          selectionField: 'Sea Level Rise Limit',
          builtBy: 'mapbox',
        },
        'groundwater-conversvation': {
          type: 'qListObject',
          selectionField: 'Groundwater Conservation',
          builtBy: 'mapbox',
        },
        'climate-ready-social-vulnerability': {
          type: 'qListObject',
          selectionField: 'Climate-Ready Social Vulnerability',
          builtBy: 'mapbox',
        },
        'city-council-districts': {
          type: 'qListObject',
          selectionField: 'city-council-districts-id',
          builtBy: 'mapbox',
        },
      },
    };
  }

  changeMapLayer = (layer, show) => {
    const currMapSelections = this.state.mapSelections;
    currMapSelections[layer] = show;
    this.setState({
      mapSelections: currMapSelections,
    });
  };

  render() {
    // console.log('props', this.props, this.props.drawerOpenState, this.props.toggleDrawer);
    return (
      <div>
        <LeftDrawer
          mapSelections={this.state.mapSelections}
          changeMapLayer={this.changeMapLayer}
          {...this.props}
        />
        <div style={styles.div}>
          <Paper style={styles.paperLeft}>
            <Mapbox
              mapSelections={this.state.mapSelections}
              mapLayerProps={this.state.mapLayerProps}
            />
          </Paper>
          <Paper style={styles.paperRight}>
            <h4>Second Vertical component</h4>
            <QlikObject qProp={qProps.neighborhoodList} type="qListObject" Component={QlikFilter} />
          </Paper>
        </div>
      </div>
    );
  }
}

export default PageOne;
