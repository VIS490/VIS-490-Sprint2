import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/styles";
import theme from "./components/ui/Theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Quiz from './components/Quiz';
import Home from './components/Home';
import Sidebar from './components/ui/Sidebar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    }

}));

const Authenticated = (
    <React.Fragment>
        <Route exact path="/" render={() => (<Home />)} />
        <Route exact path="/dashboard" render={() => (<Dashboard />)} />
        <Route exact path="/profile" render={() => (<Profile />)} />
        <Route exact path="/quiz" render={() => (<Quiz />)} />
    </React.Fragment>
)

const App = () => {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <div className={classes.root}>
                    <Sidebar />
                    <Switch >
                        {Authenticated}
                    </Switch>
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
};
export default App;
