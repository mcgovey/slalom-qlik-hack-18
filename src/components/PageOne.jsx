import React from 'react';
import Paper from 'material-ui/Paper';
import QlikObject from './QlikObject';
import QlikFilter from './QlikFilter';
import qProps from '../qProps';
import Mapbox from './Mapbox';

const mapComponents = {
  qTop: 0, qLeft: 0, qWidth: 7, qHeight: 1400,
};

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

const PageOne = () => (
  <div>
    <div style={styles.div}>
      <Paper style={styles.paperLeft}>
        <QlikObject qProp={qProps.properties} type="qHyperCube" Component={Mapbox} qPage={mapComponents} />
      </Paper>
      <Paper style={styles.paperRight}>
        <h4>Second Vertical component</h4>
        <QlikObject qProp={qProps.neighborhoodList} type="qListObject" Component={QlikFilter} />
      </Paper>
    </div>
  </div>
);

export default PageOne;
