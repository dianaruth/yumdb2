import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import IngredientSearch from '../ingredientSearch';

const RecipeSearchByIngredients = ({
  searchRecipes,
  ingredients,
  setIngredients,
}) => {
  const clearSearchInputs = () => {
    setIngredients([]);
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h2">
          Recipe Search by Ingredients
        </Typography>
      </Grid>
      <IngredientSearch
        label="Ingredients..."
        selectedIngredients={ingredients}
        setSelectedIngredients={setIngredients}
      />
      <Grid container>
        <Grid item xs={12} md={6}>
          <SearchButton variant="outlined" onClick={searchRecipes}>Search</SearchButton>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="outlined" onClick={clearSearchInputs}>Clear</Button>
        </Grid>
      </Grid>
    </>
  );
};

RecipeSearchByIngredients.propTypes = {
  searchRecipes: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
  setIngredients: PropTypes.func.isRequired,
};

export default RecipeSearchByIngredients;

const SearchButton = withStyles({
  root: {
    marginBottom: '10px',
    border: `1px solid ${lightGreen[500]};`,
    backgroundColor: lightGreen[200],
    color: lightGreen[900],
    '&:hover': {
      backgroundColor: lightGreen[100],
    },
  },
})(Button);
