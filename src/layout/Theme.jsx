import React from "react";
import { ThemeProvider, createTheme } from "@mui/material";

const marketplaceTheme = createTheme({
  palette: {
    primary: {
      main: "#daa520",
      light: "#000000",
      dark: "#101010",
    },
  },
  typography: {
    h6: {
      fontWeight: "400",
      fontSize: "1.1rem",
      color: "black",
    },

    h4: {
      fontSize: "2rem",
    },
  },
  components: {
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: "black",
          fontSize: "1rem",
        },
      },
      defaultProps: {
        size: 26,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => ({
          fontSize: "14px",
          borderRadius: "0",
          ...(ownerState.variant === "contained" &&
            ownerState.color === "primary" && {
              backgroundColor: "#DAA520",
              color: "black",
              margin: "1rem auto",
              border: "1px solid #DAA520",
              fontWeight: "bold",
              ":hover": {
                background: "whitesmoke",
                color: "#131313",
                boxShadow: "none",
                border: "1px solid #131313",
              },
            }),
          "&:hover": {
            ...(ownerState.variant === "contained" &&
              ownerState.color === "primary" && {
                backgroundColor: "#FCFCFC",
                color: "#333333",
              }),
          },
          ":disabled": {
            ...(ownerState.variant === "contained" &&
              ownerState.color === "primary" && {
                backgroundColor: "#DAA520",
                color: "black",
                margin: "1rem auto",
                border: "1px solid #DAA520",
                fontWeight: "bold",
                opacity: "50%",
              }),
          },
        }),
      },
    },
  },

  productDetailQuantity: {
    width: "3rem",
    height: "3rem",
    border: "2px solid black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ":hover": {
      cursor: "pointer",
    },
    marginRight: ".5rem",
  },
});
const Theme = ({ children }) => {
  return (
    <>
      <ThemeProvider theme={marketplaceTheme}>{children}</ThemeProvider>
    </>
  );
};

export default Theme;
