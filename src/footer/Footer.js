import React from 'react';
import styled from 'styled-components';
import { Divider, IconButton, Link } from '@material-ui/core';
import { withStyles, useTheme } from '@material-ui/core/styles';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import useWindowSize from '../hooks/useWindowSize';

const Footer = () => {
  const theme = useTheme();
  const size = useWindowSize();
  return (
    <FooterWrapper>
      {
        size.width > theme.breakpoints.values.sm ? (
          <>
            <FooterText>
              Made with&nbsp;
              <span role="img" aria-labelledby="heart">❤️</span>
              by Diana Ruth using the&nbsp;
              <Link href="https://spoonacular.com/food-api/docs">
                spoonacular API
              </Link>
            </FooterText>
            <Separator orientation="vertical" variant="middle" />
          </>
        ) : null
      }
      <IconButton href="https://www.linkedin.com/in/diana-ruth-baba3981/">
        <LinkedInIcon />
      </IconButton>
      <IconButton href="https://github.com/dianaruth">
        <GitHubIcon />
      </IconButton>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 90px;
  background-color: ${({ theme }) => theme.palette.secondary.light};

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    height: 50px;
  }
`;

const FooterText = styled.h4`
  font-weight: normal;
  color: rgba(0, 0, 0, 0.54);
`;

const Separator = withStyles({
  vertical: {
    height: '50%',
  },
})(Divider);
