import React from 'react';
import {
  Route,
  HashRouter,
  Switch,
} from 'react-router-dom';
import qDocPromise from '../qDoc';
import PageOne from './PageOne';
import PageTwo from './PageTwo';
import ErrorCard from './ErrorCard';
import SimpleTabs from './Header';
import LoadingIndicator from './LoadingIndicator';
import LeftDrawer from './LeftDrawer';

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

    return (
      <HashRouter>
        <div>
          <SimpleTabs toggleDrawer={this.toggleDrawer} />
          <LeftDrawer toggleDrawer={this.toggleDrawer} openState={this.state.leftDrawer} />
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
