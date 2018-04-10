import React from 'react';
import PropTypes from 'prop-types';
import Tabs, { Tab } from 'material-ui/Tabs';
import { withRouter } from 'react-router-dom';

class AppTabs extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
    };
  }

  handleChange = (event, value) => {
    // console.log('param', event, 'val', value, 'hist', this.props.history);
    this.setState({ value });
    const link = value === 1 ? '/compliance' : '/';
    this.props.history.push(link);
  };

  render() {
    return (
      <Tabs
        value={this.state.value}
        onChange={this.handleChange}
        centered
      >
        <Tab label="Emissions Tracking" />
        <Tab label="Compliance Overview" />
      </Tabs>
    );
  }
}
// AppTabs.propTypes = {
//   val: PropTypes.number.isRequired,
//   handleChange: PropTypes.func.isRequired,
// };

const AppTabsHandler = withRouter(AppTabs);

export default AppTabsHandler;
