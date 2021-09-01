import { createTheme } from '@material-ui/core/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#0E2747',
    },
    secondary: {
      main: '#C71A2A',
    },
  },
	typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Montserrat',
			'Roboto',
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
		button: {
      textTransform: "none"
    },
  },
});