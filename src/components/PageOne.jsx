import React from 'react';
import Paper from 'material-ui/Paper';
import 'mapbox-gl/dist/mapbox-gl.css';
// import QlikObject from './QlikObject';
// import qProps from '../qProps';
import Mapbox from './Mapbox';


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

const PageOne = () => (
  <div>
    <div style={styles.div}>
      <Paper style={styles.paperLeft}>
        <Mapbox />
      </Paper>
      <Paper style={styles.paperRight}>
        <h4>Second Vertical component</h4>
      </Paper>
    </div>
  </div>
);

export default PageOne;
