import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import theme from './components/ui/Theme'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Quiz from './components/Quiz'
import UserRoutes from './components/UserRoutes'
import Login from './components/Login'
import Signup from './components/Signup'
import { AuthProvider } from './contexts/AuthContext'
import { createApolloClient } from './graphql/apollo'
import { ApolloProvider } from '@apollo/client'
import AdminDashboard from './components/AdminDashboard'
import Members from './components/Members'

const App = () => {
	const client = createApolloClient()
	const Authenticated = (
		<React.Fragment>
			<BrowserRouter>
				<ApolloProvider client={client}>
					<AuthProvider>
						<Switch>
							<UserRoutes exact path="/dashboard" component={Dashboard} />
							<UserRoutes exact path="/team" component={Members} />
							<UserRoutes exact path="/admin-dash" component={AdminDashboard} />
							<UserRoutes path="/quiz" component={Quiz} />
							<UserRoutes path="/profile" component={Profile} />
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
