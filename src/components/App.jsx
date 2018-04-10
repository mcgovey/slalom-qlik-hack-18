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
          <SimpleTabs />
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
