import { createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#e9723d',
    },
    secondary: {
      main: '#e9723d',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#35baf6",
    },
  },
});

export default theme;
