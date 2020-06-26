import React from 'react';
import PropTypes from 'prop-types';
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';

const StyledSelect = ({
  title,
  placeholder,
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const onSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <StyledFormControl>
      <InputLabel>{title}</InputLabel>
      <LeftAlignSelect
        fullWidth
        value={selectedOption}
        onChange={onSelectChange}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>
        {
          options.map(option =>
            <MenuItem key={option.id} value={option.value}>{option.name}</MenuItem>)
        }
      </LeftAlignSelect>
    </StyledFormControl>
  );
};

StyledSelect.propTypes = {
  title: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  selectedOption: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setSelectedOption: PropTypes.func.isRequired,
};

export default StyledSelect;

const StyledFormControl = withStyles({
  root: {
    minWidth: '100%',
    '& .MuiInput-underline:after': {
      borderBottom: `2px solid ${lightGreen[500]}`,
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: lightGreen[500],
    },
  },
})(FormControl);

const LeftAlignSelect = withStyles({
  root: {
    textAlign: 'left',
  },
})(Select);
