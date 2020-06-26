/* eslint-disable react/jsx-one-expression-per-line */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Grid,
  Button,
  Chip,
} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import lightGreen from '@material-ui/core/colors/lightGreen';
import purple from '@material-ui/core/colors/purple';
import ResultDetails from './ResultDetails';
import StyledSelect from '../styledSelect';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '66.66%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const RecipeResults = ({
  totalResults,
  results,
  changePage,
  changeResultsPerPage,
  page,
  resultsPerPage,
  backToSearch,
}) => {
  const classes = useStyles();
  const location = useLocation();

  const [loadingDetails, setLoadingDetails] = useState(false);
  const [loadedRecipes, setLoadedRecipes] = useState({});
  const [expandedRecipe, setExpandedRecipe] = useState(null);

  const expandRecipe = (recipeId) => {
    if (recipeId === expandedRecipe) {
      setExpandedRecipe(null);
    } else {
      setExpandedRecipe(recipeId);
    }

    if (!loadedRecipes[recipeId]) {
      const url = `${process.env.REACT_APP_SPOONACULAR_API_URL}/recipes/${recipeId}/information?includeNutrition=true&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}`;
      setLoadingDetails(true);

      axios.get(encodeURI(url))
        .then(({ data: recipeDetails }) => {
          loadedRecipes[recipeId] = recipeDetails;
          setLoadedRecipes(loadedRecipes);
          setLoadingDetails(false);
        });
    }
  };

  const onPaginationChange = (_, value) => {
    changePage(value);
  };

  const onResultsPerPageDropdownChange = (value) => {
    changeResultsPerPage(value);
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid container justify="flex-start">
        <Button
          size="large"
          startIcon={<ArrowBackIcon />}
          onClick={backToSearch}
        >
          Back to Search
        </Button>
      </Grid>
      {
        results.length > 0
          ? (
            <>
              <Grid item xs={12}>
                <Typography variant="h2">
                  Results
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {
                  results.map(result => (
                    <ExpansionPanel
                      key={result.id}
                      expanded={result.id === expandedRecipe}
                      onChange={() => expandRecipe(result.id)}
                    >
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Grid container direction="row" justify="center" alignItems="center">
                          {
                            result.usedIngredients
                            && result.unusedIngredients
                            && result.missedIngredients
                              ? (
                                <Grid item xs={12}>
                                  <Typography align="left" className={classes.heading}><b>{result.title}</b></Typography>
                                </Grid>
                              ) : (
                                <Grid item xs={12} md={6}>
                                  <Typography align="left" className={classes.heading}><b>{result.title}</b></Typography>
                                </Grid>
                              )
                          }
                          {
                            result.usedIngredients
                            && result.unusedIngredients
                            && result.missedIngredients
                              ? (
                                <Grid container direction="row" justify="flex-start" alignItems="center">
                                  <Grid item xs={12} md={4}>
                                    <Typography align="left" variant="subtitle1">Used Ingredients:</Typography>
                                    {
                                      result.usedIngredients.length > 0
                                        ? result.usedIngredients.map(ingredient => (
                                          <StyledChip
                                            key={ingredient.id}
                                            label={ingredient.name}
                                            style={{ backgroundColor: purple[50] }}
                                          />
                                        ))
                                        : <Typography align="left" variant="subtitle2">None</Typography>

                                    }
                                  </Grid>
                                  <Grid item xs={12} md={4}>
                                    <Typography align="left" variant="subtitle1">Unused Ingredients:</Typography>
                                    {
                                      result.unusedIngredients.length > 0
                                        ? result.unusedIngredients.map(ingredient => (
                                          <StyledChip
                                            key={ingredient.id}
                                            label={ingredient.name}
                                            style={{ backgroundColor: purple[50] }}
                                          />
                                        ))
                                        : <Typography align="left" variant="subtitle2">None</Typography>

                                    }
                                  </Grid>
                                  <Grid item xs={12} md={4}>
                                    <Typography align="left" variant="subtitle1">Additional Ingredients:</Typography>
                                    {
                                      result.missedIngredients.length > 0
                                        ? result.missedIngredients.map(ingredient => (
                                          <StyledChip
                                            key={ingredient.id}
                                            label={ingredient.name}
                                            style={{ backgroundColor: purple[50] }}
                                          />
                                        ))
                                        : <Typography align="left" variant="subtitle2">None</Typography>
                                    }
                                  </Grid>
                                </Grid>
                              ) : (
                                <Grid item xs={12} md={6}>
                                  <Typography align="left" className={classes.secondaryHeading}>Ready In {result.readyInMinutes} minutes, {result.servings} servings</Typography>
                                </Grid>
                              )
                          }
                        </Grid>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        {
                          loadingDetails
                            ? (
                              <Grid container justify="center">
                                <GreenCircularProgress />
                              </Grid>
                            )
                            : loadedRecipes[result.id]
                              ? (
                                <ResultDetails recipeDetails={loadedRecipes[result.id]} />
                              ) : null
                        }
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  ))
                }
              </Grid>
              {
                location.pathname !== '/recipe-search-by-ingredients'
                  ? (
                    <>
                      <Grid item xs={12}>
                        <BlankDiv />
                      </Grid>
                      <Grid item sm={2} xs={12}>
                        <Grid container direction="row" justify="center" alignItems="center">
                          <Grid item xs={12}>
                            <StyledSelect
                              title="Results per Page"
                              placeholder="Select number of results"
                              options={[
                                {
                                  id: 1,
                                  value: 10,
                                  name: '10',
                                },
                                {
                                  id: 2,
                                  value: 20,
                                  name: '20',
                                },
                                {
                                  id: 3,
                                  value: 50,
                                  name: '50',
                                },
                                {
                                  id: 4,
                                  value: 100,
                                  name: '100',
                                },
                              ]}
                              selectedOption={resultsPerPage}
                              setSelectedOption={onResultsPerPageDropdownChange}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                      <PaginationWrapper>
                        <Pagination
                          count={
                            Math.min(
                              Math.ceil(totalResults / resultsPerPage),
                              Math.ceil(900 / resultsPerPage),
                            )
                          }
                          page={page}
                          onChange={onPaginationChange}
                          showFirstButton
                          showLastButton
                        />
                      </PaginationWrapper>
                    </>
                  ) : null
              }
            </>
          ) : (
            <Typography variant="h4">
              No Results
            </Typography>
          )
      }
    </Grid>
  );
};

RecipeResults.propTypes = {
  totalResults: PropTypes.number,
  results: PropTypes.arrayOf(PropTypes.shape({
    usedIngredients: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
    unusedIngredients: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
    missedIngredients: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
    })),
  })).isRequired,
  changePage: PropTypes.func,
  changeResultsPerPage: PropTypes.func,
  page: PropTypes.number,
  resultsPerPage: PropTypes.number,
  backToSearch: PropTypes.func,
};

export default RecipeResults;

const GreenCircularProgress = withStyles({
  root: {
    color: lightGreen[300],
    margin: '30px',
  },
})(CircularProgress);

const PaginationWrapper = styled.div`
  margin-top: 20px;
`;

const BlankDiv = styled.div`
  height: 40px;
`;

const StyledChip = withStyles({
  root: {
    margin: '5px',
  },
})(Chip);
