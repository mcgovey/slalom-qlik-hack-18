import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
// import AppTabsHandler from './AppTabs';
// <AppTabsHandler />
import CurrentSelectionsBox from './CurrentSelectionsBox';
// <CurrentSelectionsBox />


const styles = theme => ({
  root: {
    flexGrow: 1,
    // marginTop: theme.spacing.unit * 3,
    backgroundColor: theme.palette.background.paper,
  },
});


class Header extends React.Component {
  // <NavLink to="/" style={{ textDecoration: 'none' }}><Tab label="Emissions Tracking" /></NavLink>
  // <NavLink to="/compliance"><Tab label="Compliance Overview" /></NavLink>

  render() {
    const { classes } = this.props;
    // const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.props.toggleDrawer('leftDrawer', true)} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="title" color="inherit">
              C40 Cities Building Energy
            </Typography>
          </Toolbar>
        </AppBar>
        <CurrentSelectionsBox />
      </div>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  toggleDrawer: PropTypes.func.isRequired,
};

export default withStyles(styles)(Header);
