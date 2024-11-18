import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1e88e5', // Custom blue for buttons and highlights
    },
    secondary: {
      main: '#f57c00', // Accent color (e.g., for delete buttons)
    },
    background: {
      default: '#f5f5f5', // Light gray background
    },
    text: {
      primary: '#333333', // Dark text for better contrast
      secondary: '#555555', // Placeholder text color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
    },
  },
});

export default theme;
