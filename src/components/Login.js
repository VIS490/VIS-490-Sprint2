import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { Link, useHistory } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import Alert from '@material-ui/lab/Alert'
import AlertTitle from '@material-ui/lab/AlertTitle'
import {useMutation, useQuery} from '@apollo/client'
import { ADD_NEW_USER } from '../graphql/mutations'

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
	learnMore:{
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
	}
	
}))

const Login = () => {
	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const { login, signInWithGoogle, currentUser  } = useAuth()
	const classes = useStyles()
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const history = useHistory()
	const [addTodo] = useMutation(ADD_NEW_USER)

	async function handleSubmit(e) {
		e.preventDefault()

		try {
			setError('')
			setLoading(true)
			await login(email, pass)
			history.push('/dashboard')
		} catch {
			setError('Failed to Login')
		}
		setLoading(false)
	}

	const emailChange = (event) => {
		setEmail(event.target.value)
	}

	const passwordChange = (event) => {
		setPass(event.target.value)
	}
	const GoogleAuth = async () => {
		try {
			setError('')
			setLoading(true)
			await signInWithGoogle()
			setLoading(true)
			try{
				addTodo({
					variables: {
						input:
							{
								name: currentUser.displayName,
								email: currentUser.email,
								pic: currentUser.photoURL,
								id: currentUser.uid
							}
					}
				})
			} catch (e){
				console.log('already in db')
			}
			history.push('/dashboard')
		} catch {
			setError('Failed to Login')
		}
		setLoading(false)
	}
	
	return (
		<div className="container">
			<Container component="main" maxWidth="xs">

				<CssBaseline />
				<div className={classes.paper}>
					{error &&
						<Alert variant="filled" severity="error">
							<AlertTitle>Error</AlertTitle>
							{error}
						</Alert>
					}
					{<img src="/static/companyLogo.png" alt="company logo" style={{height:'150px', width:'150px'}}/>}
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleSubmit}>
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
							onChange={emailChange}
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
							onChange={passwordChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign In
						</Button>
						<Button
							type="submit"
							href="https://agile-hamlet-62576.herokuapp.com"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.learnMore}
						>
							Learn More about VIS
						</Button>
						<Grid container>
							<Grid item xs>
								<div href="#" variant="body2">
								</div>
							</Grid>
							<Grid item>
								<div>
									{'Don\'t have an account? '}
									<Link to="/signup">Sign Up</Link>
								</div>
								
							</Grid>
							
						</Grid>
					</form>
				</div>
				<Button
					variant="contained"
					color="primary"
					className={classes.button}
					onClick={GoogleAuth}>
					Login or Signup with Google
				</Button>
				<Box mt={8} />
			</Container>
		</div>
	)
}
export default Login
