import React, {useEffect} from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Sidebar from './ui/Sidebar'
import { makeStyles } from '@material-ui/styles'
import {useQuery} from '@apollo/client'
import {FIND_ADMIN_EMAIL} from '../graphql/queries'
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	}

}))

export default function UserRoutes({ component: Component, ...rest }) {
	const { currentUser, setAdminStatus } = useAuth()
	const classes = useStyles()
	const { loading, error, data } = useQuery(FIND_ADMIN_EMAIL, {
		variables: { admin_email: currentUser.email }
	})

	if (loading) return <div>Loading...</div>
	if (error) return `Error! ${error.message}`
	if (data.Admins_by_pk == null) {
		setAdminStatus(false)
	}else {
		setAdminStatus(true)
	}


	return (
		<div className={classes.root}>
			<Sidebar />
			<Route
				{...rest}
				render={props => {
					return currentUser ? <Component {...props} /> : <Redirect to="/"/>
				}}
			/>
		</div>
	)
}