import { createMuiTheme } from '@material-ui/core/styles';
import brown from '@material-ui/core/colors/brown';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  typography: {
    fontFamily: [
      'Noto Sans TC',
      'sans-serif',
    ].join(','),
  },
  palette: {
    primary: {
      light: brown[100],
      main: brown[200],
      dark: brown[300],
    },
    secondary: {
      light: grey[200],
      main: grey[300],
      dark: grey[400],
    },
  },
  textField: {
    focusColor: '#4dd0e1',
  },
});

export default theme;
