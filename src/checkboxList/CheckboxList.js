import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import remove from 'lodash/remove';

const CheckboxList = ({
  title,
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  const onCheckboxChange = (value) => {
    if (selectedOptions.includes(value)) {
      setSelectedOptions(remove(selectedOptions, selectedOption => value !== selectedOption));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  return (
    <FormControl>
      <FormLabel>{title}</FormLabel>
      <FormGroup>
        {
          options.map(option => (
            <FormControlLabel
              key={option.id}
              checked={selectedOptions.includes(option.value)}
              control={<StyledCheckbox onChange={() => onCheckboxChange(option.value)} color="primary" />}
              label={option.name}
            />
          ))
        }
      </FormGroup>
    </FormControl>
  );
};

CheckboxList.propTypes = {
  title: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    description: PropTypes.string,
    value: PropTypes.string.isRequired,
  })).isRequired,
  selectedOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedOptions: PropTypes.func.isRequired,
};

export default CheckboxList;

const StyledCheckbox = withStyles({
  root: {
    '&$checked': {
      color: lightGreen[800],
    },
  },
  checked: {},
})(Checkbox);
