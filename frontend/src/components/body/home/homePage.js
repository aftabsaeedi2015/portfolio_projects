import { Box, Typography, Card } from "@mui/material";
import React from "react";
import "./bgVideo.css";
import { makeStyles } from "@mui/styles";
import { useTheme, ThemeProvider } from "@mui/material/styles";
import theme from "../../theme";
import StyledButton from "../../styledComponents/styledButton";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import handleChange from "../../header/Menu_items/Menu_items";
import LoginForm from "../../styledComponents/styledLoginForm";

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "nowrap",
    width: "30vw",
    height: "fit-content",
    marginBottom: "2rem",
    flexGrow: 0,
    [useTheme().breakpoints.down("md")]: {
      width: "fit-content",

    },

    [useTheme().breakpoints.down("sm")]: {
      marginLeft: "0rem",
      marginTop: "1rem",

    },
    [useTheme().breakpoints.down("xs")]: {
      marginLeft: "0rem",
      marginTop: "3rem",
    },
  },
  homeHeading: {
    display: "block",
    fontSize: "4rem",
    marginBottom: "3rem",
    fontFamily: "serif",
    color: "white",
    [useTheme().breakpoints.down("sm")]: {
      fontSize: "0.5rem",

    },
    [useTheme().breakpoints.down("md")]: {
      fontSize: "1rem",
    },
    [useTheme().breakpoints.down("lg")]: {
      fontSize: "3rem",
    },
  },
  homePara: {
    fontsize: "20px",
    color: "white",
    marginBottom: "3rem",
  },
  homePageParentContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "80vh",
    justifyContent: "start",
    [useTheme().breakpoints.up("md")]: {
      justifyContent: "center",
    },
    [useTheme().breakpoints.down("sm")]: {
      paddingBottom: '1rem'
    },

  },
  homePage1ContentContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "nowrap",
    width: "fit-content",
    height: "fit-content",
    marginTop: "2rem",
    borderRadius: "5px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    justifyContent: "center",
    [useTheme().breakpoints.up("md")]: {
      padding: "3rem",
    },

    [useTheme().breakpoints.down("sm")]: {
      marginLeft: "0",
      marginTop: "0rem",
      flexDirection: "column",
      height: "100%",
      paddingBottom: "1rem",
    },
    [useTheme().breakpoints.down("md")]: {
      marginLeft: "0",
      marginTop: "0rem",
      flexDirection: "column",
      // height: '130vh'
    },
  },
  customFocused: {
    "& .css-1ff8729-MuiInputBase-root-MuiFilledInput-root:after": {
      borderBottom: "2px solid white",
    },
  },
  homePageForm: {
    display: "flex",
    alignItems: "center",
  },
}));

function HomePage() {
  const classes = useStyles(theme);
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.login);

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        className={classes.homePageParentContainer}
        initial={{ y: 500, opacity: 0 }}
        transition={{ duration: 0.5 }}
        whileInView={{ y: 0, opacity: 1 }}
      >
        <Box className={classes.homePage1ContentContainer}>
          <Box
            alignItems="center"
            justifyContent="center"
            className={classes.boxContainer}
          >
            <Typography className={classes.homeHeading} variant="p">
              Are you ready to get fit ?
            </Typography>
            <Typography variant="p" className={classes.homePara}>
              Welcome to our premier fitness destination: the ultimate haven for
              achieving your health and wellness goals. At our gym, we're not
              just about lifting weights or running on treadmills - we're
              dedicated to transforming lives. Are you ready to embark on a
              journey towards a healthier, fitter you?
            </Typography>
            <Box>
              <StyledButton
                onClick={() => {
                  dispatch({ type: 1 });
                }}
              >
                <Link
                  to="/classes"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  View classes
                </Link>
              </StyledButton>
              <StyledButton
                onClick={() => {
                  dispatch({ type: 2 });
                }}
              >
                <Link
                  to="/pricing"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  View Plans
                </Link>
              </StyledButton>
            </Box>
          </Box>
          {!loginStatus ? <LoginForm /> : null}
        </Box>
      </motion.div>
    </ThemeProvider>
  );
}

export default HomePage;
