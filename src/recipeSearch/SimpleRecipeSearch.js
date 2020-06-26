import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  TextField,
  Button,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import IngredientSearch from '../ingredientSearch';
import StyledSelect from '../styledSelect';
import CheckboxList from '../checkboxList';
import diets from '../assets/diets.json';
import cuisines from '../assets/cuisines.json';
import intolerances from '../assets/intolerances.json';

const SimpleRecipeSearch = ({
  searchRecipes,
  searchInput,
  setSearchInput,
  excludedIngredients,
  setExcludedIngredients,
  selectedDiet,
  setSelectedDiet,
  selectedIntolerances,
  setSelectedIntolerances,
  selectedCuisines,
  setSelectedCuisines,
}) => {
  const updateSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const clearSearchInputs = () => {
    setSearchInput('');
    setExcludedIngredients([]);
    setSelectedDiet('');
    setSelectedIntolerances([]);
    setSelectedCuisines([]);
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h2">
          Recipe Search
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <StyledTextField value={searchInput} onChange={updateSearchInput} fullWidth label="Search" />
      </Grid>
      <IngredientSearch
        label="Ingredients to exclude..."
        selectedIngredients={excludedIngredients}
        setSelectedIngredients={setExcludedIngredients}
      />
      <Grid item xs={12}>
        <StyledSelect
          title="Diet"
          placeholder="Select Diet"
          options={diets}
          selectedOption={selectedDiet}
          setSelectedOption={setSelectedDiet}
        />
      </Grid>
      <StyledGrid alignItems="center" justify="center" container>
        <Grid item xs={12} md={6}>
          <CheckboxList
            title="Cuisines"
            options={cuisines}
            selectedOptions={selectedCuisines}
            setSelectedOptions={setSelectedCuisines}
          />
        </Grid>
        <StyledGrid item xs={6}>
          <CheckboxList
            title="Intolerances"
            options={intolerances}
            selectedOptions={selectedIntolerances}
            setSelectedOptions={setSelectedIntolerances}
          />
        </StyledGrid>
      </StyledGrid>
      <Grid container>
        <Grid item xs={12} md={6}>
          <SearchButton variant="outlined" onClick={() => searchRecipes(10, 0)}>Search</SearchButton>
        </Grid>
        <Grid item xs={12} md={6}>
          <Button variant="outlined" onClick={clearSearchInputs}>Clear</Button>
        </Grid>
      </Grid>
    </>
  );
};

SimpleRecipeSearch.propTypes = {
  searchRecipes: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  setSearchInput: PropTypes.func.isRequired,
  excludedIngredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
  setExcludedIngredients: PropTypes.func.isRequired,
  selectedDiet: PropTypes.string.isRequired,
  setSelectedDiet: PropTypes.func.isRequired,
  selectedIntolerances: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedIntolerances: PropTypes.func.isRequired,
  selectedCuisines: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedCuisines: PropTypes.func.isRequired,
};

export default SimpleRecipeSearch;

const StyledGrid = styled(Grid)`
  padding: 20px 0px 20px 0px;
`;

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
