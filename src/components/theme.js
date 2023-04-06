import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: "#42a5f5",
      dark: "#42a5f5",
    },
    secondary: {
      main: "#03DAC5",
    },
    background: {
      default: "#F5F5F5",
    },
    error: {
      main: "#B00020",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: "#FFFFFF",
          "&:hover": {
            backgroundColor: "#3700B3",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: "1rem",
        },
      },
    },
  },
});

export default theme;
