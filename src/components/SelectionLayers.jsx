import React from 'react';
import PropTypes from 'prop-types';
import {
  FormLabel,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
} from 'material-ui/Form';
import Switch from 'material-ui/Switch';

class SelectionLayers extends React.Component {
  static propTypes = {
    mapSelections: PropTypes.object.isRequired,
    changeMapLayer: PropTypes.func.isRequired,
  }


  // state = {
  //   'nine-inch-sea-level-rise': false,
  //   'twentyone-inch-sea-level-rise': false,
  //   'thirtysix-inch-sea-level-rise': false,
  //   'groundwater-conversvation': false,
  //   'fiveft-plus-sea-level-rise': false,
  //   'sevenptfiveft-plus-sea-level-rise': false,
  //   'climate-ready-social-vulnerability': false,
  // };

  handleChange = name => (event) => {
    this.props.changeMapLayer(name, event.target.checked);
  };

  render() {
    return (
      <FormControl component="fieldset">
        <FormLabel component="legend">Map Layers</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={
              <Switch
                checked={this.props.mapSelections.pts}
                onChange={this.handleChange('pts')}
                value="pts"
              />
            }
            label="Individual Points"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.props.mapSelections.neighborhoods}
                onChange={this.handleChange('neighborhoods')}
                value="neighborhoods"
              />
            }
            label="Neighborhoods"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.props.mapSelections['sea-level-rise']}
                onChange={this.handleChange('sea-level-rise')}
                value="sea-level-rise"
              />
            }
            label="Sea Level Rise"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.props.mapSelections['groundwater-conversvation']}
                onChange={this.handleChange('groundwater-conversvation')}
                value="groundwater-conversvation"
              />
            }
            label="Groundwater Conservation"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.props.mapSelections['climate-ready-social-vulnerability']}
                onChange={this.handleChange('climate-ready-social-vulnerability')}
                value="climate-ready-social-vulnerability"
              />
            }
            label="Climate Ready Social Vulnerability"
          />
          <FormControlLabel
            control={
              <Switch
                checked={this.props.mapSelections['city-council-districts']}
                onChange={this.handleChange('city-council-districts')}
                value="city-council-districts"
              />
            }
            label="City Council Districts"
          />
        </FormGroup>
        <FormHelperText>Select to enable on map</FormHelperText>
      </FormControl>
    );
  }
}


export default SelectionLayers;
