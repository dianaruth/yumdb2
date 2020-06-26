import React from 'react';
import styled from 'styled-components';
import cooking from '../assets/cooking.jpg';
import ingredients from '../assets/ingredients.jpg';
import vegetarian from '../assets/vegetarian.jpg';
import Card from './Card';

const Cards = () => {
  const cards = [
    {
      id: 1,
      title: 'Plug and Go',
      description: 'Check your pantry, add the ingredients you already have, and find recipes you can make right now - without a trip to the grocery store',
      img: ingredients,
    },
    {
      id: 2,
      title: 'Made for Your Lifestyle',
      description: 'Accommodate your dietary preferences with filters for Gluten-Free, Vegetarian, Vegan, Keto, and more!',
      img: vegetarian,
    },
    {
      id: 3,
      title: 'Link to Great Recipes',
      description: 'Find a great recipe from a huge variety of trusted sources to create the perfect meal',
      img: cooking,
    },
  ];

  return (
    <CardsWrapper>
      {
        cards.map(({
          id, title, description, img,
        }) =>
          <Card key={id} title={title} description={description} img={img} />)
      }
    </CardsWrapper>
  );
};

export default Cards;

const CardsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.primary.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    flex-direction: column;
  }
`;
