import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import {
  Route,
  NavLink,
  HashRouter,
  Switch,
} from 'react-router-dom';
import qDocPromise from '../qDoc';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import ErrorCard from './ErrorCard';
// import '../styles/material_styles.css';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
    };
  }

  async componentWillMount() {
    this.setState({ loading: true, error: false });
    try {
      await qDocPromise;
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    } else if (this.state.error) {
      return <ErrorCard error={this.state.error} />;
    }

    return (
      <HashRouter>
        <div>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography variant="title" color="inherit">
                Title
              </Typography>
            </Toolbar>
          </AppBar>
          <ul className="header">
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/compliance">Stuff</NavLink></li>
          </ul>
          <div className="content">
            <Switch>
              <Route exact path="/" component={PageOne} />
              <Route path="/compliance" component={PageTwo} />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}
