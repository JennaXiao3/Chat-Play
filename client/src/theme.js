import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#ffffff",
    },
  },
  typography: {
    h1: {
      color: "#9D7BFF",
      fontSize: "2.3rem",
      fontWeight: 800,
    },
    body1: {
      color: "#B2B0BA",
      fontSize: "1rem",
    },
  },
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: "fill" },
          style: {
            padding: "1.1rem",
            backgroundImage:
              "linear-gradient(to bottom left, #C6A8FC, #8C99FF)",
            borderRadius: "1rem",
            fontSize: "1.3rem",
            fontWeight: 600,
            width: "100%",
            color: "#272532",
            transition: "all .2s ease-out",
            "&:hover": {
              transform: "scale(1.02)",
            },
          },
        },
        {
          props: { variant: "outlined" },
          style: {
            padding: "1.1rem",
            backgroundColor: "none",
            borderRadius: "1rem",
            fontSize: "1.3rem",
            fontWeight: 600,
            width: "100%",
            color: "#A9A1FE",
            border: "3px solid #A9A1FE",
            transition: "all .2s ease-out",
            "&:hover": {
              transform: "scale(1.04)",
              border: "3px solid #A9A1FE",
            },
          },
        },
      ],
    },
  },
});

export default theme;
