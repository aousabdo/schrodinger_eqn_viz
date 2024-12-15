import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00b0ff',
    },
    secondary: {
      main: '#1de9b6',
    },
    background: {
      default: '#0a192f',
      paper: '#1a2c4e',
    },
    text: {
      primary: '#e6f1ff',
      secondary: '#8892b0',
    },
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
  },
});
