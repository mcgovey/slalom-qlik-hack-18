import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import AppTabsHandler from './AppTabs';


const styles = theme => ({
  root: {
    flexGrow: 1,
    // marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});


class SimpleTabs extends React.Component {
  // <NavLink to="/" style={{ textDecoration: 'none' }}><Tab label="Emissions Tracking" /></NavLink>
  // <NavLink to="/compliance"><Tab label="Compliance Overview" /></NavLink>

  render() {
    const { classes } = this.props;
    // const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Title
            </Typography>
          </Toolbar>
          <AppTabsHandler />
        </AppBar>
        {/* {value === 0 && <TabContainer>Item One</TabContainer>}
        {value === 1 && <TabContainer>Item Two</TabContainer>} */}
      </div>
    );
  }
}

SimpleTabs.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTabs);
