import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing.unit / 2,
    // backgroundColor: '#fff',
  },
  chip: {
    margin: theme.spacing.unit / 2,
  },
});

class QlikCurrentSelections extends React.Component {
  static propTypes = {
    // qData: PropTypes.object.isRequired,
    qLayout: PropTypes.object.isRequired,
    clearSelections: PropTypes.func.isRequired,
  }

  handleDelete = data => () => {
    this.props.clearSelections(data.qField);
  };

  render() {
    // console.log('qlayout', this.props.qLayout);
    console.log('qSelections', this.props.qLayout.qSelectionObject.qSelections);
    return (
      <Paper style={{ backgroundColor: '#004797', opacity: 0.8 }}>
        {this.props.qLayout.qSelectionObject.qSelections.map(data =>
           (
             <Chip
               key={data.qField}
              //  avatar={avatar}
               label={data.qField + (data.qSelectedCount > 1 ? '' : (`: ${data.qSelected}`))}
               style={{ margin: 10 }}
               onDelete={this.handleDelete(data)}
             />
          ))}
      </Paper>
    );
  }
}


export default withStyles(styles)(QlikCurrentSelections);
