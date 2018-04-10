import React from 'react';
import Paper from 'material-ui/Paper';
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
    height: '100%',
    margin: 10,
    textAlign: 'center',
    padding: 10,
  },
  paperRight: {
    height: 600,
    flex: 1,
    margin: 10,
    textAlign: 'center',
  },
};

const PageOne = () => (
  <div>
    <div style={styles.div}>
      <section className="mapbox" style={styles.paperLeft}>
        <Mapbox />
      </section>
      <Paper style={styles.paperRight}>
        <h4>Second Vertical component</h4>
      </Paper>
    </div>
  </div>
);

export default PageOne;
