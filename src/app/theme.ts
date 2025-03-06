import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#007bff", // Primary color
    },
    secondary: {
      main: "#ff4081", // Secondary color
    },
  },
  typography: {
    fontFamily: "Geist, sans-serif",
  },
});

export default theme;
