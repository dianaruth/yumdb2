import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import ThemeProvider from './themeProvider';
import Header from './header';
import Banner from './banner';
import Cards from './cards';
import RecipeSearch from './recipeSearch';
import Footer from './footer';
import theme from './theme';
import './App.css';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Switch>
            <Route path="/recipe-search">
              <RecipeSearch type="basic" />
            </Route>
            <Route path="/recipe-search-by-ingredients">
              <RecipeSearch type="ingredients" />
            </Route>
            <Route path="/recipe-search-complex">
              <RecipeSearch type="complex" />
            </Route>
            <Route path="/">
              <Banner />
              <Cards />
            </Route>
          </Switch>
          <Footer />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
