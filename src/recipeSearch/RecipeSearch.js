import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import grey from '@material-ui/core/colors/grey';
import RecipeResults from '../recipeResults';
import SimpleRecipeSearch from './SimpleRecipeSearch';
import RecipeSearchByIngredients from './RecipeSearchByIngredients';
import ComplexRecipeSearch from './ComplexRecipeSearch';

const RecipeSearch = ({ type }) => {
  const location = useLocation();
  const [showResults, setShowResults] = useState(false);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [recipeResults, setRecipeResults] = useState({});
  const [page, setPage] = useState(1);
  const [resultsPerPage, setResultsPerPage] = useState(10);
  const [searchInput, setSearchInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [excludedIngredients, setExcludedIngredients] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState('');
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [excludedCuisines, setExcludedCuisines] = useState([]);
  const [selectedIntolerances, setSelectedIntolerances] = useState([]);
  const [maxReadyTime, setMaxReadyTime] = useState(20);
  const [calories, setCalories] = useState([50, 800]);
  const [carbs, setCarbs] = useState([10, 100]);
  const [protein, setProtein] = useState([10, 100]);
  const [fat, setFat] = useState([0, 100]);

  const searchRecipesBasic = (number, offset) => {
    setShowResults(true);

    const url = `${process.env.REACT_APP_SPOONACULAR_API_URL}/recipes/search?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=${searchInput}&cuisine=${selectedCuisines.join(',')}&diet=${selectedDiet}&excludeIngredients=${excludedIngredients.map(ingredient => ingredient.name).join(',')}&intolerances=${selectedIntolerances.join(',')}&number=${number}&offset=${offset}`;

    setResultsLoading(true);
    axios.get(encodeURI(url))
      .then(({ data: results }) => {
        setRecipeResults(results);
        setResultsLoading(false);
      })
      .catch(err => {
        setRecipeResults({ results: [] });
        setResultsLoading(false);
      });
  };

  const searchRecipesByIngredients = () => {
    setShowResults(true);

    const url = `${process.env.REACT_APP_SPOONACULAR_API_URL}/recipes/findByIngredients?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&ingredients=${ingredients.map(ingredient => ingredient.name).join(',')}&number=100`;

    setResultsLoading(true);
    axios.get(encodeURI(url))
      .then(({ data: results }) => {
        setRecipeResults(results);
        setResultsLoading(false);
      })
      .catch(err => {
        setRecipeResults({ results: [] });
        setResultsLoading(false);
      });
  };

  const searchRecipesComplex = (number, offset) => {
    setShowResults(true);

    const url = `${process.env.REACT_APP_SPOONACULAR_API_URL}/recipes/complexSearch?apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&query=${searchInput}&cuisine=${selectedCuisines.join(',')}&excludedCuisine=${excludedCuisines.join(',')}&diet=${selectedDiet}&intolerances=${selectedIntolerances.join(',')}&includeIngredients=${ingredients.map(ingredient => ingredient.name).join(',')}&excludeIngredients=${excludedIngredients.map(ingredient => ingredient.name).join(',')}&maxReadyTime=${maxReadyTime}&minCalories=${calories[0]}&maxCalories=${calories[1]}&minCarbs=${carbs[0]}&maxCarbs=${carbs[1]}&minProtein=${protein[0]}&maxProtein=${protein[1]}&minFat=${fat[0]}&maxFat=${fat[1]}&number=${number}&offset=${offset}`;

    setResultsLoading(true);
    axios.get(encodeURI(url))
      .then(({ data: results }) => {
        setRecipeResults(results);
        setResultsLoading(false);
      })
      .catch(err => {
        setRecipeResults({ results: [] });
        setResultsLoading(false);
      });
  };

  const searchFunctionsMap = {
    '/recipe-search': searchRecipesBasic,
    '/recipe-search-by-ingredients': searchRecipesByIngredients,
    '/recipe-search-complex': searchRecipesComplex,
  };

  const changePage = (newPage) => {
    setPage(newPage);
    searchFunctionsMap[location.pathname](resultsPerPage, (newPage - 1) * resultsPerPage);
  };

  const changeResultsPerPage = (newResultsPerPage) => {
    setResultsPerPage(newResultsPerPage);
    searchFunctionsMap[location.pathname](newResultsPerPage, 0);
  };

  const backToSearch = () => {
    setPage(1);
    setResultsPerPage(10);
    setShowResults(false);
  };

  return (
    <RecipeSearchWrapper>
      <StyledContainer>
        <StyledPaper elevation={3}>
          <StyledContainer>
            {
              !showResults
                ? (
                  <Grid container spacing={3}>
                    {
                      type === 'basic'
                        ? (
                          <SimpleRecipeSearch
                            searchRecipes={searchRecipesBasic}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            excludedIngredients={excludedIngredients}
                            setExcludedIngredients={setExcludedIngredients}
                            selectedDiet={selectedDiet}
                            setSelectedDiet={setSelectedDiet}
                            selectedIntolerances={selectedIntolerances}
                            setSelectedIntolerances={setSelectedIntolerances}
                            selectedCuisines={selectedCuisines}
                            setSelectedCuisines={setSelectedCuisines}
                          />
                        ) : null
                    }
                    {
                      type === 'ingredients'
                        ? (
                          <RecipeSearchByIngredients
                            searchRecipes={searchRecipesByIngredients}
                            ingredients={ingredients}
                            setIngredients={setIngredients}
                          />
                        ) : null
                    }
                    {
                      type === 'complex'
                        ? (
                          <ComplexRecipeSearch
                            searchRecipes={searchRecipesComplex}
                            searchInput={searchInput}
                            setSearchInput={setSearchInput}
                            ingredients={ingredients}
                            setIngredients={setIngredients}
                            excludedIngredients={excludedIngredients}
                            setExcludedIngredients={setExcludedIngredients}
                            selectedDiet={selectedDiet}
                            setSelectedDiet={setSelectedDiet}
                            selectedIntolerances={selectedIntolerances}
                            setSelectedIntolerances={setSelectedIntolerances}
                            selectedCuisines={selectedCuisines}
                            setSelectedCuisines={setSelectedCuisines}
                            excludedCuisines={excludedCuisines}
                            setExcludedCuisines={setExcludedCuisines}
                            maxReadyTime={maxReadyTime}
                            setMaxReadyTime={setMaxReadyTime}
                            calories={calories}
                            setCalories={setCalories}
                            carbs={carbs}
                            setCarbs={setCarbs}
                            protein={protein}
                            setProtein={setProtein}
                            fat={fat}
                            setFat={setFat}
                          />
                        ) : null
                    }
                  </Grid>
                )
                : resultsLoading
                  ? (
                    <GreenCircularProgress />
                  ) : (
                    <RecipeResults
                      totalResults={recipeResults.totalResults}
                      results={recipeResults.results || recipeResults}
                      changePage={changePage}
                      changeResultsPerPage={changeResultsPerPage}
                      page={page}
                      resultsPerPage={resultsPerPage}
                      backToSearch={backToSearch}
                    />
                  )
            }
          </StyledContainer>
        </StyledPaper>
      </StyledContainer>
    </RecipeSearchWrapper>
  );
};

RecipeSearch.propTypes = {
  type: PropTypes.string.isRequired,
};

export default RecipeSearch;

const RecipeSearchWrapper = styled.div`
  background-color: ${({ theme }) => theme.palette.secondary.dark};
`;

const StyledPaper = withStyles({
  root: {
    backgroundColor: grey[200],
  },
})(Paper);

const StyledContainer = styled(Container)`
  padding-top: 50px;
  padding-bottom: 50px;
`;

const GreenCircularProgress = withStyles({
  root: {
    color: lightGreen[300],
    margin: '30px',
  },
})(CircularProgress);
