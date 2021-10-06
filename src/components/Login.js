import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  Snackbar,
  TextField
} from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Link } from "react-router-dom";

import { Paper } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import users from "../../data/users";
import { MIN_USERNAME_LENGTH, MIN_PASSWORD_LENGTH } from "../config";
import authService from "./../service/authService";
import { Alert } from "@material-ui/lab";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

export default function SignInSide(props) {
  if (authService.isLoggedIn()) {
    props.history.push("/home/movies");
  }

  const classes = useStyles();

  const [account, setAccount] = React.useState({ username: "", password: "" });

  const [error, setError] = React.useState({ username: "", password: "" });

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleChange = (property, event) => {
    const accountCopy = {
      ...account
    };

    accountCopy[property] = event.target.value;
    setAccount(accountCopy);

    validate(property);
  };

  const validate = (property) => {
    property === "username" ? validateUsername() : validatePassword();
  };

  const handleLogin = () => {
    if (isValidUser(account.username, account.password)) {
      authService.doLogin(account.username);
      props.history.push("/home/movies");
    } else {
      setOpen(true);
    }
  };

  const isValidUser = (username, password) => {
    return users.find(
      (user) => user.username === username && user.password === password
    );
  };

  const validateUsername = () => {
    const errorCopy = { ...error };
    if (account.username.includes(" ")) {
      errorCopy.username = "Username cannot contain a space";
    } else if (account.username.length < MIN_USERNAME_LENGTH) {
      errorCopy.username = `Username should be greater than ${MIN_USERNAME_LENGTH} chars`;
    } else {
      errorCopy.username = "";
    }

    setError(errorCopy);
  };

  const validatePassword = () => {
    const errorCopy = { ...error };
    if (account.password.length < MIN_PASSWORD_LENGTH) {
      errorCopy.password = `Password should be greater than ${MIN_PASSWORD_LENGTH} chars`;
    } else {
      errorCopy.password = "";
    }
    setError(errorCopy);
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              value={account.username}
              onChange={(event) => handleChange("username", event)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              error={error.username}
              helperText={error.username}
              id="username"
              label="Username"
              name="username"
              autoFocus
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              error={error.password}
              helperText={error.password}
              type="password"
              id="password"
              autoComplete="current-password"
              value={account.password}
              onChange={(event) => handleChange("password", event)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleLogin}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup">{"Don't have an account? Sign Up"}</Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          Incorrect username or password
        </Alert>
      </Snackbar>
    </Grid>
  );
}
