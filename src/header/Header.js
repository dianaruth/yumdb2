import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  Button,
  Drawer,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import { withStyles, useTheme } from '@material-ui/core/styles';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import useWindowSize from '../hooks/useWindowSize';

const Header = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const size = useWindowSize();

  const toggleDrawer = () => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setOpen(!open);
  };

  return (
    <HeaderWrapper isMobile={size.width < theme.breakpoints.values.sm}>
      {size.width < theme.breakpoints.values.sm ? (
        <>
          <HamburgerMenu onClick={toggleDrawer()}>
            <MenuIcon />
          </HamburgerMenu>
          <Drawer anchor="top" open={open} onClose={toggleDrawer()}>
            <List>
              <ListItem button key="home" component={(props) => <Link to="/" {...props} />}>
                <ListItemIcon><MailIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
              <ListItem button key="recipeSearch" component={(props) => <Link to="/recipe-search" {...props} />}>
                <ListItemIcon><RestaurantIcon /></ListItemIcon>
                <ListItemText primary="Recipe Search" />
              </ListItem>
            </List>
          </Drawer>
        </>
      )
        : (
          <>
            <Title>
              <span>Yum</span>
              <span>DB</span>
            </Title>
            <LinkWrapper>
              <Button><StyledLink to="/">Home</StyledLink></Button>
              <Button><StyledLink to="/recipe-search">Recipe Search</StyledLink></Button>
              <Button><StyledLink to="/recipe-search-by-ingredients">Recipe Search by Ingredients</StyledLink></Button>
              <Button><StyledLink to="/recipe-search-complex">Complex Recipe Search</StyledLink></Button>
            </LinkWrapper>
            <IconWrapper>
              <RestaurantIcon fontSize="large" />
            </IconWrapper>
          </>
        )}
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.secondary.light};
  justify-content: ${({ isMobile }) => (isMobile ? 'left' : 'center')};
  height: 100px;

  @media (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    height: 50px;
  }
`;

const HamburgerMenu = withStyles({
  root: {
    marginLeft: '10px',
  },
})(IconButton);

const Title = styled.h1`
  text-align: center;
  flex-grow: 1;
`;

const LinkWrapper = styled.div`
  flex-grow: 2;
  display: flex;
  justify-content: space-evenly;
`;

const IconWrapper = styled.div`
  flex-grow: 1;
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  color: black;
  text-decoration: none;
  text-transform: none;
`;
