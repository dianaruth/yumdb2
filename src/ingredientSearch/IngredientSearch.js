import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import {
  Grid,
  TextField,
  Tooltip,
  IconButton,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
  Chip,
  Fade,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { Autocomplete } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpIcon from '@material-ui/icons/Help';
import lightGreen from '@material-ui/core/colors/lightGreen';
import grey from '@material-ui/core/colors/grey';
import some from 'lodash/some';
import remove from 'lodash/remove';
import debounce from 'lodash/debounce';
import ingredients from '../assets/ingredients.json';

const IngredientSearch = ({
  label,
  selectedIngredients,
  setSelectedIngredients,
}) => {
  const [additionalIngredientsOptions, setAdditionalIngredientsOptions] = useState([]);
  const [additionalIngredientsLoading, setAdditionalIngredientsLoading] = useState(false);
  const ingredientHelpTooltip = 'Can\'t find what you\'re looking for? This list only contains the 1,000 most popular ingredients. Search for more ingredients in the Additional Ingredients search bar below';

  const addIngredient = (ingredient) => {
    if (ingredient !== null && !some(selectedIngredients, ingredient)) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const deleteIngredient = (ingredientId) => {
    setSelectedIngredients(
      remove(selectedIngredients, (ingredient) => ingredient.id !== ingredientId),
    );
  };

  const fetchAdditionalIngredients = debounce((searchTerm) => {
    const url = `${process.env.REACT_APP_SPOONACULAR_API_URL}/food/ingredients/autocomplete?query=${searchTerm}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&metaInformation=true&number=100`;
    axios.get(url)
      .then(({ data: ingredientsResults }) => {
        setAdditionalIngredientsOptions(
          ingredientsResults.map(
            ingredientResult => ({ name: ingredientResult.name, id: ingredientResult.id }),
          ),
        );
        setAdditionalIngredientsLoading(false);
      });
  }, 500);

  const onAdditionalIngredientsChange = (event) => {
    event.persist();
    if (event.type === 'change' && event.target.value !== '') {
      setAdditionalIngredientsLoading(true);
      fetchAdditionalIngredients(event.target.value);
    } else if (event.type === 'click' || event.type === 'blur') {
      setAdditionalIngredientsOptions([]);
    }
  };

  return (
    <>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={10} lg={11}>
            <Autocomplete
              options={ingredients}
              getOptionLabel={(option) => option.name}
              onChange={(_, newValue) => {
                addIngredient(newValue);
              }}
              renderInput={(params) => <StyledTextField {...params} label={label} />}
            />
          </Grid>
          <Grid item xs={1}>
            <Tooltip
              placement="left"
              title={ingredientHelpTooltip}
              TransitionComponent={Fade}
              TransitionProps={{ timeout: 600 }}
            >
              <IconButton>
                <HelpIcon />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <ExpansionPanel>
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Additional Ingredients</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Autocomplete
              onInputChange={onAdditionalIngredientsChange}
              options={additionalIngredientsOptions}
              getOptionLabel={(option) => option.name}
              onChange={(_, newValue) => {
                addIngredient(newValue);
              }}
              fullWidth
              loading={additionalIngredientsLoading}
              renderInput={(params) => (
                <StyledTextField
                  {...params}
                  label="Search for additional ingredients"
                />
              )}
            />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
      <Grid container alignItems="flex-start">
        {
          selectedIngredients.map(ingredient => (
            <StyledChip
              key={ingredient.id}
              label={ingredient.name}
              onDelete={() => deleteIngredient(ingredient.id)}
            />
          ))
        }
      </Grid>
    </>
  );
};

IngredientSearch.propTypes = {
  label: PropTypes.string.isRequired,
  selectedIngredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })).isRequired,
  setSelectedIngredients: PropTypes.func.isRequired,
};

export default IngredientSearch;

const StyledTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: lightGreen[500],
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: lightGreen[500],
    },
  },
})(TextField);

const StyledChip = withStyles({
  root: {
    backgroundColor: lightGreen[300],
    color: grey[800],
    margin: '5px',
  },
})(Chip);
