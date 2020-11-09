import React, { Route, BrowserRouter as Router, useState } from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import SignUp from './Signup';
import fire from './Authentication';
import Dashboard from './Dashboard';

<Router>
  <Route path="/Signup.js" component={SignUp} />
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const [email ,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loggedIn , setLoggin] = useState(false);
  const classes = useStyles();


  function emailChange (event){
    setEmail(event.target.value);
  }

  function passwordChange (event){
    setPassword(event.target.value);
  }

  function logIn (){
    try{
      fire.auth().signInWithEmailAndPassword(email, password);
      console.log("success");
      setLoggin(true);
    }
    catch(error){
      const errorMessage = error.message;
      alert(errorMessage);
    }
  }

  return (
    <div class = 'container'>
      {loggedIn ? <Dashboard/> :
      
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src="/companyLogo.png" alt=""/>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange = {emailChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange = {passwordChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick ={logIn}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to="/Login" className="">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
      </Box>
    </Container>

      }
    
    </div>
  );
}