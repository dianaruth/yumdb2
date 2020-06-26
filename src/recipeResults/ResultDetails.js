/* eslint-disable no-use-before-define */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {
  Grid,
  Typography,
  Chip,
  Link,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  Paper,
  IconButton,
  Collapse,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import lightGreen from '@material-ui/core/colors/lightGreen';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import brown from '@material-ui/core/colors/brown';
import lightBlue from '@material-ui/core/colors/lightBlue';
import yellow from '@material-ui/core/colors/yellow';
import purple from '@material-ui/core/colors/purple';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';
import ClearIcon from '@material-ui/icons/Clear';
import GrainIcon from '@material-ui/icons/Grain';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import StarIcon from '@material-ui/icons/Star';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

const ResultDetails = ({
  recipeDetails,
}) => {
  const attributeChips = {
    vegetarian: {
      backgroundColor: lightGreen[400],
      label: 'Vegetarian',
      icon: <KeyboardArrowDownIcon />,
    },
    vegan: {
      backgroundColor: green[200],
      label: 'Vegan',
      icon: <AccessibilityNewIcon />,
    },
    glutenFree: {
      backgroundColor: brown[100],
      label: 'Gluten Free',
      icon: <GrainIcon />,
    },
    dairyFree: {
      backgroundColor: grey[400],
      label: 'Dairy Free',
      icon: <ClearIcon />,
    },
    veryHealthy: {
      backgroundColor: lightBlue[200],
      label: 'Healthy',
      icon: <InsertEmoticonIcon />,
    },
    veryPopular: {
      backgroundColor: yellow[200],
      label: 'Popular',
      icon: <StarIcon />,
    },
    cheap: {
      backgroundColor: green[400],
      label: 'Cheap',
      icon: <MonetizationOnIcon />,
    },
  };

  const [nutritionInformationOpen, setNutritionInformationOpen] = useState(false);

  return (
    <Grid container>
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={4}>
          <Image src={recipeDetails.image} alt="recipe" />
        </Grid>
        <Grid item xs={12} sm={8}>
          <StyledGrid container direction="column" justify="flex-start" alignItems="flex-start">
            <Grid item xs={12}>
              <TitleLink
                href={recipeDetails.sourceUrl}
                target="_blank"
              >
                {recipeDetails.title}
              </TitleLink>
            </Grid>
            {
              recipeDetails.sourceName
                ? (
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      by&nbsp;
                      {recipeDetails.sourceName}
                    </Typography>
                  </Grid>
                ) : null
            }
            <Grid item xs={12}>
              {
                recipeDetails.vegetarian && (
                  <StyledChip
                    icon={attributeChips.vegetarian.icon}
                    label={attributeChips.vegetarian.label}
                    style={{ backgroundColor: attributeChips.vegetarian.backgroundColor }}
                  />
                )
              }
              {
                recipeDetails.vegan && (
                  <StyledChip
                    icon={attributeChips.vegan.icon}
                    label={attributeChips.vegan.label}
                    style={{ backgroundColor: attributeChips.vegan.backgroundColor }}
                  />
                )
              }
              {
                recipeDetails.glutenFree && (
                  <StyledChip
                    icon={attributeChips.glutenFree.icon}
                    label={attributeChips.glutenFree.label}
                    style={{ backgroundColor: attributeChips.glutenFree.backgroundColor }}
                  />
                )
              }
              {
                recipeDetails.dairyFree && (
                  <StyledChip
                    icon={attributeChips.dairyFree.icon}
                    label={attributeChips.dairyFree.label}
                    style={{ backgroundColor: attributeChips.dairyFree.backgroundColor }}
                  />
                )
              }
              {
                recipeDetails.veryHealthy && (
                  <StyledChip
                    icon={attributeChips.veryHealthy.icon}
                    label={attributeChips.veryHealthy.label}
                    style={{ backgroundColor: attributeChips.veryHealthy.backgroundColor }}
                  />
                )
              }
              {
                recipeDetails.veryPopular && (
                  <StyledChip
                    icon={attributeChips.veryPopular.icon}
                    label={attributeChips.veryPopular.label}
                    style={{ backgroundColor: attributeChips.veryPopular.backgroundColor }}
                  />
                )
              }
              {
                recipeDetails.cheap && (
                  <StyledChip
                    label={attributeChips.cheap.label}
                    style={{ backgroundColor: attributeChips.cheap.backgroundColor }}
                    icon={attributeChips.cheap.icon}
                  />
                )
              }
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={4}>
                <Grid container direction="column">
                  <Grid item xs={12}>
                    <Typography variant="overline">Ready In</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <LargeText variant="h1">{recipeDetails.readyInMinutes}</LargeText>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Grid container direction="column">
                  <Grid item xs={12}>
                    <LargeText variant="h1">{recipeDetails.servings}</LargeText>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="overline">Servings</Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Grid container direction="column">
                  <Grid item xs={12}>
                    <Typography variant="overline">Health Score</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <LargeText variant="h1">{recipeDetails.healthScore}</LargeText>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </StyledGrid>
        </Grid>
      </Grid>
      <Grid container justify="center" alignItems="center">
        <IngredientsWrapper>
          {
            recipeDetails.extendedIngredients.map(ingredient => (
              <StyledChip
                key={ingredient.id}
                label={ingredient.name}
                style={{ backgroundColor: purple[50] }}
              />
            ))
          }
        </IngredientsWrapper>
      </Grid>
      <Grid item xs={12}>
        <Grid container justify="flex-start" alignItems="center">
          <IconButton onClick={() => setNutritionInformationOpen(!nutritionInformationOpen)}>
            {nutritionInformationOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
          <Typography variant="h5">Nutrition Information</Typography>
        </Grid>
        <Collapse in={nutritionInformationOpen} timeout="auto" unmountOnExit>
          <TableContainer component={GreenPaper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>
                      {recipeDetails.title}
                      &nbsp;(
                      {recipeDetails.nutrition.weightPerServing.amount}
                      {recipeDetails.nutrition.weightPerServing.unit}
                      &nbsp;serving)
                    </b>
                  </TableCell>
                  <TableCell><b>Amount</b></TableCell>
                  <TableCell><b>% Daily Needs</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  recipeDetails.nutrition.nutrients.map(nutrient => (
                    <TableRow key={nutrient.title}>
                      <TableCell>
                        {nutrient.title}
                        &nbsp;(
                        {nutrient.unit}
                        )
                      </TableCell>
                      <TableCell>
                        {nutrient.amount}
                      </TableCell>
                      <TableCell>
                        {nutrient.percentOfDailyNeeds}
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </TableContainer>
        </Collapse>
      </Grid>
    </Grid>
  );
};

ResultDetails.propTypes = {
  recipeDetails: PropTypes.shape({
    title: PropTypes.string.isRequired,
    sourceName: PropTypes.string,
    summary: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    vegetarian: PropTypes.bool.isRequired,
    vegan: PropTypes.bool.isRequired,
    glutenFree: PropTypes.bool.isRequired,
    dairyFree: PropTypes.bool.isRequired,
    veryHealthy: PropTypes.bool.isRequired,
    veryPopular: PropTypes.bool.isRequired,
    cheap: PropTypes.bool.isRequired,
    readyInMinutes: PropTypes.number.isRequired,
    servings: PropTypes.number.isRequired,
    healthScore: PropTypes.number.isRequired,
    nutrition: PropTypes.shape({
      nutrients: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
        percentOfDailyNeeds: PropTypes.number.isRequired,
      })),
      weightPerServing: PropTypes.shape({
        amount: PropTypes.number.isRequired,
        unit: PropTypes.string.isRequired,
      }),
    }).isRequired,
    extendedIngredients: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.number.isRequired,
    })),
    sourceUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default ResultDetails;

const Image = styled.img`
  width: 100%;
  border-radius: 50%;
`;

const StyledGrid = styled(Grid)`
  padding-left: 30px;
`;

const StyledChip = withStyles({
  root: {
    margin: '5px',
  },
})(Chip);

const LargeText = styled(Typography)`
  color: #4caf50;
`;

const IngredientsWrapper = styled.div`
  margin: 20px 0px 20px 0px;
`;

const TitleLink = withStyles({
  root: {
    fontSize: '40px',
    color: lightGreen[600],
  },
})(Link);

const GreenPaper = withStyles({
  root: {
    backgroundColor: lightGreen[100],
  },
})(Paper);
