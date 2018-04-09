import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';


export default class ErrorCard extends React.Component {
  static propTypes = {
    error: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props);

    this.state = {
      msg: this.props.error.message,
    };
  }

  render() {
    return (
      <div>
        <Paper elevation={4}>
          <Typography variant="headline" component="h3">
            Application Error
          </Typography>
          <Typography component="p">
            {this.state.msg}
          </Typography>
        </Paper>
      </div>
    );
  }
}
