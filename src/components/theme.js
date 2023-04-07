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
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 400,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: "1.2rem",
      fontWeight: 300,
      lineHeight: 1.5,
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      },
    },
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
