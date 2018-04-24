import React from 'react';
import PropTypes from 'prop-types';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';

class SelectionColorDim extends React.Component {
  static propTypes = {
    colorSelection: PropTypes.string.isRequired,
    changeColorDim: PropTypes.func.isRequired,
  }

  // handleChange = name => (event) => {
  //   console.log('a call for change', event.target.value);
  //   this.props.changeColorDim(name, event.target.value);
  // };

  render() {
    return (
      <form autoComplete="off">
        <FormControl style={{ width: '100%' }}>
          <InputLabel htmlFor="colorSelection">Color by dimension</InputLabel>
          <Select
            value={this.props.colorSelection}
            onChange={(event) => { this.props.changeColorDim(event.target.value); }}
            inputProps={{
              name: 'colorSelection',
              id: 'colorSelectionForMap',
            }}
          >
            <MenuItem value="metric1">Emissions</MenuItem>
            <MenuItem value="metric2">Consumption</MenuItem>
            <MenuItem value="metric4">GHG Intensity</MenuItem>
            <MenuItem value="metric7">Reduction Status</MenuItem>
          </Select>
        </FormControl>
      </form>
    );
  }
}


export default SelectionColorDim;
