import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import Sidebar from './ui/Sidebar'
import { makeStyles } from '@material-ui/styles'
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex'
    }

}))

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth()
    const classes = useStyles()

    return (
        <div className={classes.root}>
            <Sidebar />
            <Route
                {...rest}
                render={props => {
                    return currentUser ? <Component {...props} /> : <Redirect to="/" />
                }}
            ></Route>
        </div>
    )
}