import React from 'react';
import {
  Route,
  HashRouter,
  Switch,
} from 'react-router-dom';
import qDocPromise from '../qDoc';
import PageOne from './PageOne';
// import PageTwo from './PageTwo';
import ErrorCard from './ErrorCard';
import Header from './Header';
import LoadingIndicator from './LoadingIndicator';

export default class Root extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: false,
      leftDrawer: false,
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

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    if (this.state.loading) {
      return (
        <LoadingIndicator size={100} marginLeft="45%" />
      );
    } else if (this.state.error) {
      return <ErrorCard error={this.state.error} />;
    }

    // <Route path="/compliance" component={PageTwo} />
    return (
      <HashRouter>
        <div>
          <Header toggleDrawer={this.toggleDrawer} />
          <div className="content">
            <Switch>
              <Route
                exact
                path="/"
                render={() => (<PageOne
                  drawerOpenState={this.state.leftDrawer}
                  toggleDrawer={this.toggleDrawer}
                />)}
              />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
}
