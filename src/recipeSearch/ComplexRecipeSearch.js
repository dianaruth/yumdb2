import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  TextField,
  Button,
  Slider,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import IngredientSearch from '../ingredientSearch';
import StyledSelect from '../styledSelect';
import CheckboxList from '../checkboxList';
import diets from '../assets/diets.json';
import cuisines from '../assets/cuisines.json';
import intolerances from '../assets/intolerances.json';

const ComplexRecipeSearch = ({
  searchRecipes,
  searchInput,
  setSearchInput,
  ingredients,
  setIngredients,
  excludedIngredients,
  setExcludedIngredients,
  selectedDiet,
  setSelectedDiet,
  selectedIntolerances,
  setSelectedIntolerances,
  selectedCuisines,
  setSelectedCuisines,
  excludedCuisines,
  setExcludedCuisines,
  maxReadyTime,
  setMaxReadyTime,
  calories,
  setCalories,
  carbs,
  setCarbs,
  protein,
  setProtein,
  fat,
  setFat,
}) => {
  const updateSearchInput = (event) => {
    setSearchInput(event.target.value);
  };

  const clearSearchInputs = () => {
    setSearchInput('');
    setIngredients([]);
    setExcludedIngredients([]);
    setSelectedDiet('');
    setSelectedIntolerances([]);
    setSelectedCuisines([]);
    setExcludedIngredients([]);
    setMaxReadyTime(20);
    setCalories([50, 800]);
    setCarbs([10, 100]);
    setProtein([10, 100]);
    setFat([0, 100]);
  };

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h2">
          Complex Recipe Search
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <StyledTextField value={searchInput} onChange={updateSearchInput} fullWidth label="Search" />
      </Grid>
      <IngredientSearch
        label="Ingredients.."
        selectedIngredients={ingredients}
        setSelectedIngredients={setIngredients}
      />
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
        <StyledGrid item xs={12} md={6}>
          <CheckboxList
            title="Cuisines to Exclude"
            options={cuisines}
            selectedOptions={excludedCuisines}
            setSelectedOptions={setExcludedCuisines}
          />
        </StyledGrid>
        <StyledGrid item xs={12} md={6}>
          <CheckboxList
            title="Intolerances"
            options={intolerances}
            selectedOptions={selectedIntolerances}
            setSelectedOptions={setSelectedIntolerances}
          />
        </StyledGrid>
      </StyledGrid>
      <Grid item xs={12}>
        <Typography align="left" gutterBottom>
          Maximum Ready Time
        </Typography>
        <StyledSlider
          value={maxReadyTime}
          valueLabelDisplay="auto"
          step={10}
          marks
          min={0}
          max={200}
          onChange={(_, value) => setMaxReadyTime(value)}
        />
      </Grid>
      <Grid item xs={12}>
        <Typography align="left" gutterBottom>
          Calories
        </Typography>
        <StyledSlider
          value={calories}
          onChange={(_, value) => setCalories(value)}
          marks
          step={100}
          min={0}
          max={2000}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography align="left" gutterBottom>
          Carbs (g)
        </Typography>
        <StyledSlider
          value={carbs}
          onChange={(_, value) => setCarbs(value)}
          marks
          step={10}
          min={0}
          max={100}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography align="left" gutterBottom>
          Protein (g)
        </Typography>
        <StyledSlider
          value={protein}
          onChange={(_, value) => setProtein(value)}
          marks
          step={10}
          min={0}
          max={100}
          valueLabelDisplay="auto"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography align="left" gutterBottom>
          Fat (g)
        </Typography>
        <StyledSlider
          value={fat}
          onChange={(_, value) => setFat(value)}
          marks
          step={10}
          min={0}
          max={100}
          valueLabelDisplay="auto"
        />
      </Grid>
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

ComplexRecipeSearch.propTypes = {
  searchRecipes: PropTypes.func.isRequired,
  searchInput: PropTypes.string.isRequired,
  setSearchInput: PropTypes.func.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  })),
  setIngredients: PropTypes.func.isRequired,
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
  excludedCuisines: PropTypes.arrayOf(PropTypes.string).isRequired,
  setExcludedCuisines: PropTypes.func.isRequired,
  maxReadyTime: PropTypes.number.isRequired,
  setMaxReadyTime: PropTypes.func.isRequired,
  calories: PropTypes.arrayOf(PropTypes.number).isRequired,
  setCalories: PropTypes.func.isRequired,
  carbs: PropTypes.arrayOf(PropTypes.number).isRequired,
  setCarbs: PropTypes.func.isRequired,
  protein: PropTypes.arrayOf(PropTypes.number).isRequired,
  setProtein: PropTypes.func.isRequired,
  fat: PropTypes.arrayOf(PropTypes.number).isRequired,
  setFat: PropTypes.func.isRequired,
};

export default ComplexRecipeSearch;

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

const StyledSlider = withStyles({
  root: {
    color: lightGreen[700],
  },
})(Slider);
