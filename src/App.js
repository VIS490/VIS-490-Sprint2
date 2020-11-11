import React, { useEffect, useState } from 'react';
import { ThemeProvider } from "@material-ui/styles";
import { makeStyles } from "@material-ui/styles";
import theme from "./components/ui/Theme";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Quiz from './components/Quiz';
import Home from './components/Home';
import Sidebar from './components/ui/Sidebar';
import Login from "./components/Login"
import Socket from './components/Socket'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    }

}));


const App = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const classes = useStyles();
    // const socket = useRef()
    // const [auth, setAuth] = useState(false)

    useEffect(() => {
        Socket.emit('message', 'bye')
        Socket.on('new message', (msg) => {
            console.log("Server " + msg)
        })
        Socket.on('new user', (msg) => {
            console.log("Server " + msg)
        })
    }, [])


    // useEffect(() => {
    //     socket.current = io.connect('http://localhost:5000')

    //     return () => {
    //         window.removeEventListener("beforeunload", () => {
    //             socket.current && socket.current.close();
    //         })
    //     }
    // }, [])

    const Authenticated = (
        <React.Fragment>
            <BrowserRouter>
                <div className={classes.root}>
                    <Sidebar />
                    <Switch >
                        <Route exact path="/" render={() => (<Login userlogin={userlogin} setUserEmail={setUserEmail} setUserPass={setUserPass} />)} />
                        <Route exact path="/home" render={() => (<Home />)} />
                        <Route exact path="/dashboard" render={() => (<Dashboard />)} />
                        <Route exact path="/profile" render={() => (<Profile />)} />
                        <Route exact path="/quiz" render={() => (<Quiz />)} />
                    </Switch>
                </div>
            </BrowserRouter>
        </React.Fragment>
    )

    const userlogin = () => {
        console.log(email)
        console.log(password)
        Socket.emit('new login', { "email": email, "password": password })
    }
    const setUserEmail = (email) => {
        setEmail(email)
    }
    const setUserPass = (pass) => {
        setPassword(pass)
    }



    return <ThemeProvider theme={theme} >
        {Authenticated}
    </ThemeProvider>

}
export default App
