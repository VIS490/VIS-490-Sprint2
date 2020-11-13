import React, { useState } from 'react'
import { ThemeProvider, makeStyles } from '@material-ui/styles'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import theme from './components/ui/Theme'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Quiz from './components/Quiz'
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login'
import Signup from './components/Signup'
import Socket from './components/Socket'
import { useAuth, AuthProvider, currrentUser } from './contexts/AuthContext'
import { createApolloClient } from './graphql/apollo'

const App = () => {
	const client = createApolloClient()
	const Authenticated = (
		<React.Fragment>
			<BrowserRouter>
				<ApolloProvider client={client}>
					<AuthProvider>
						<Switch>
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
							<PrivateRoute path="/quiz" component={Quiz} />
							<PrivateRoute path="/profile" component={Profile} />
							<Route path="/signup" component={Signup} />
							<Route path="/" component={Login} />
						</Switch>
					</AuthProvider>
				</ApolloProvider>
			</BrowserRouter>
		</React.Fragment>
	)
	return (
		<ThemeProvider theme={theme}>
			{Authenticated}
		</ThemeProvider>
	)
}
export default App
