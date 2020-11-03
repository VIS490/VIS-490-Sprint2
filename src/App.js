import React from 'react'
import {ThemeProvider} from '@material-ui/styles';
import {makeStyles} from '@material-ui/styles';
import theme from './components/ui/Theme';
import {Button} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    app: {}
}))

const App = () => {
    const classes = useStyles()
    return (
        <ThemeProvider theme={theme}>
            <div className={classes.app}>
                App.js
            </div>
            <Button variant={"outlined"} color={"primary"}>TEST FOR Material UI</Button>
        </ThemeProvider>
    );
}

export default App;
