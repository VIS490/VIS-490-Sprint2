import React, { Route, BrowserRouter as Router, useState } from 'react';
import { Link } from "react-router-dom";
import login from "./login"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignIn from './login';
import Dashboard from './Dashboard';
import {Socket} from '../Socket';
import {useEffect} from 'react';

<Router>
  <Route path="/Login.js" component={SignIn} />
</Router>

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  img: {
    height: 100,
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const [loggedIn , setLoggin] = useState(false);
  const [email,setEmail] =useState ("");
  const [password,setPassword] = useState("");
  const [firstName , setFirstName] =useState("");
  const [lastName , setLastName] = useState("");

  
  useEffect(() => {
    Socket.on("connect", () => {
      console.log('connected');
    });

    Socket.on("loggin", (result) => {
      setLoggin(result['response']);
      
    });

  }, []);

  function firstNameChange (event){
    setFirstName(event.target.value);

  }
  function lastNameChange (event){
    setLastName(event.target.value);
  }

  function emailChange (event){
    setEmail(event.target.value);

  }

  function passwordChange (event){
    setPassword(event.target.value);
  }
  function signup (){
    Socket.emit("signup",{user_email:email,user_password:password});
   
  }

 
  return (
    <div class = "container">
    {loggedIn ?
    <Dashboard/>:<Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
      <img src="/companyLogo.png" alt=""/>
        
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
              onChange = {firstNameChange}

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
              onChange = {lastNameChange}
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
              autoComplete="email"
              onChange = {emailChange}
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
              autoComplete="current-password"
              onChange = {passwordChange}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick ={signup}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link to="/Signin" className="">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </form>
    </div>
    <Box mt={5}>
    </Box>
  </Container>
    }
    </div>
  );
  
}
