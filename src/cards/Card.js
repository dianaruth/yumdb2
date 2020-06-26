import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography } from '@material-ui/core';

const Panel = ({ title, description, img }) => (
  <CardImage img={img}>
    <CardWrapper>
      <CardContent>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Typography variant="body2" component="p">
          {description}
        </Typography>
      </CardContent>
    </CardWrapper>
  </CardImage>
);

Panel.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
};

export default Panel;

const CardImage = styled.div`
  background: url(${({ img }) => img}) no-repeat center;
  background-size: cover;
  height: 300px;
  width: 300px;
  margin: 180px 30px 300px 30px;
  border-radius: 50%;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    margin: 60px 30px 150px 30px;
  }
`;

const CardWrapper = withStyles({
  root: {
    marginTop: '250px',
    height: '150px',
    display: 'flex',
    alignItems: 'center',
  },
})(Card);
