import React, { useState } from "react";

import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import authService from "./../service/authService";
import { ToastContainer, toast } from "react-toastify";
import { useHistory } from "react-router";
import "../style/styles.css";
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://cyzkq.csb.app/">
        MovieAdda
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignUp() {
  const classes = useStyles();
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });
  const history = useHistory();

  const handleClick = async () => {
    try {
      // let response = await authService.signUp(data);
      // if(!response.data.status)
      // {
      //   toast.error(response.data.message)
      //   return;
      // }
      // toast.success(response.data.message)
      // history.push("/discover/popular");
      // history.go(0)
    } catch (error) {
      toast.error("exception occured");
    }
  };

  const validate = (data) => {
    if (
      !data.email.match(
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
      )
    ) {
      toast.error("please add valid email");
      return false;
    }
    return true;
  };

  const handle_signUp = async () => {
    try {
      let isValid = validate(data);
      if (!isValid) return;

      let response = await authService.signUp(data);
      if (!response.data.status) {
        toast.error(response.data.message);
        return;
      }

      toast.success(response.data.message);
      history.push("/discover/popular");
      history.go(0);
    } catch (error) {
      toast.error("exception occured");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <ToastContainer />
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) =>
                  setData({ ...data, firstName: e.target.value })
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                onChange={(e) => setData({ ...data, lastName: e.target.value })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                onChange={(e) => setData({ ...data, email: e.target.value })}
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={(e) => setData({ ...data, password: e.target.value })}
                autoComplete="current-password"
              />
            </Grid>
          </Grid>
          {/* <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid> */}
        </form>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handle_signUp}
        >
          Sign Up
        </Button>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
