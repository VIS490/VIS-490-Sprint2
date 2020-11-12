import React, { useEffect, useState } from 'react'
import { ThemeProvider, makeStyles } from '@material-ui/styles'
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink } from '@apollo/client';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import theme from './components/ui/Theme'
import Dashboard from './components/Dashboard'
import Profile from './components/Profile'
import Quiz from './components/Quiz'
import Home from './components/Home'
import Sidebar from './components/ui/Sidebar'
import Login from './components/Login'
import Socket from './components/Socket'

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	}

}))

const createApolloClient = (authToken) => {
	return new ApolloClient({
		link: new HttpLink({
			uri: 'https://hasura.io/learn/graphql',
			headers: {
				Authorization: `Bearer ${authToken}`
			}
		}),
		cache: new InMemoryCache(),
	});
};

const App = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [firstName, setFirstName] = useState('')
	const [lastName, setLastName] = useState('')
	const classes = useStyles()
	let client;
	// const socket = useRef()
	// const [auth, setAuth] = useState(false)

	useEffect(() => {
		Socket.emit('message', 'bye')
		Socket.on('new message', (msg) => {
			console.log(`Server ${msg}`)
		})
		Socket.on('new user', (msg) => {
			// console.log(msg)
			client = createApolloClient(msg.idToken);
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
		<>
			<BrowserRouter>
				<div className={classes.root}>
					<Sidebar />
					<Switch>
						<Route exact path="/" render={() => (<Login userlogin={userlogin} setUserEmail={setUserEmail} setUserPass={setUserPass} />)} />
						<Route exact path="/home" render={() => (<Home />)} />
						<Route exact path="/dashboard" render={() => (<Dashboard />)} />
						<Route exact path="/profile" render={() => (<Profile />)} />
						<Route exact path="/quiz" render={() => (<Quiz />)} />
					</Switch>
				</div>
			</BrowserRouter>
		</>
	)

	const userlogin = () => {
		console.log(email)
		console.log(password)
		Socket.emit('new login', { email, password })
	}
	const setUserEmail = (email) => {
		setEmail(email)
	}
	const setUserPass = (pass) => {
		setPassword(pass)
	}

	return (
		// <ApolloProvider client={client}>
		<ThemeProvider theme={theme}>
			{Authenticated}
		</ThemeProvider>
		// </ApolloProvider>
	)
}
export default App
