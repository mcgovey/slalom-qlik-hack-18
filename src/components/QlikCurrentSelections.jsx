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

  // state = {
  //   chipData: [
  //     { key: 0, label: 'Angular' },
  //     { key: 1, label: 'jQuery' },
  //     { key: 2, label: 'Polymer' },
  //     { key: 3, label: 'React' },
  //     { key: 4, label: 'Vue.js' },
  //   ],
  // };

  handleDelete = data => () => {
    console.log('data deleted', data);

    this.props.clearSelections(data.qField);
    // const chipData = [...this.state.chipData];
    // const chipToDelete = chipData.indexOf(data);
    // chipData.splice(chipToDelete, 1);
    // this.setState({ chipData });
  };


  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: 0,
  //   };
  // }

  render() {
    // console.log('qlayout', this.props.qLayout);
    return (
      <Paper>
        {this.props.qLayout.qSelectionObject.qSelections.map(data =>
          // let avatar = null;

          // if (data.label === 'React') {
          //   avatar = (
          //     <Avatar>
          //       <TagFacesIcon className={classes.svgIcon} />
          //     </Avatar>
          //   );
          // }

           (
             <Chip
               key={data.qField}
              //  avatar={avatar}
               label={data.qField}
               style={{ margin: 10 }}
               onDelete={this.handleDelete(data)}
             />
          ))}
      </Paper>
    );
  }
}


export default withStyles(styles)(QlikCurrentSelections);
