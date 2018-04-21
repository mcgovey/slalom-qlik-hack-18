import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import QlikObject from './QlikObject';
// import QlikFilter from './QlikFilter';
import qProps from '../qProps';
import Mapbox from './Mapbox';
import LeftDrawer from './LeftDrawer';
import RightPanel from './RightPanel';

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
          type: 'qHyperCube',
          selectionField: 'Climate-Ready Social Vulnerability',
          builtBy: 'qlik',
        },
        'city-council-districts': {
          type: 'qHyperCube',
          selectionField: 'city-council-districts-id',
          builtBy: 'qlik',
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
    const styles = {
      rightPanel: {
        float: 'right',
        maxWidth: '300px',
        opacity: '0.9',
      },
    };
    const buildingCubeProps = {
      qTop: 0, qLeft: 0, qWidth: 10, qHeight: 10,
    };
    return (
      <div>
        <LeftDrawer
          mapSelections={this.state.mapSelections}
          changeMapLayer={this.changeMapLayer}
          {...this.props}
        />
        <div className="col12">
          <div className="col12" style={{ width: '100%', height: '100%' }}>
            <Mapbox
              mapSelections={this.state.mapSelections}
              mapLayerProps={this.state.mapLayerProps}
            />
          </div>
          <div className="col4 fill-darken3 pin-right contain" style={styles.rightPanel}>
            <Paper>
              <QlikObject
                qProp={qProps.objectHCList}
                type="qHyperCube"
                qPage={buildingCubeProps}
                Component={RightPanel}
              />
            </Paper>
          </div>
        </div>
      </div>
    );
  }
}

export default PageOne;
