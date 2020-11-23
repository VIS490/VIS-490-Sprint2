import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import { useAuth } from '../contexts/AuthContext'
import { gql, useQuery, useMutation } from '@apollo/client'
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
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	img: {
		height: 100,
	},
}))
const Signup = () => {


	const [email, setEmail] = useState('')
	const [pass, setPass] = useState('')
	const [fname, setfName] = useState('')
	const [lname, setlName] = useState('')
	const { signup } = useAuth()
	const classes = useStyles()
	const [error, setError] = useState('')
	const [loading, setLoading] = useState(false)
	const history = useHistory()
	const [addTodo] = useMutation(ADD_NEW_USER)



	const firstNameChange = (event) => {
		setfName(event.target.value)
	}

	const lastNameChange = (event) => {
		setlName(event.target.value)
	}

	const emailChange = (event) => {
		setEmail(event.target.value)
	}

	const passwordChange = (event) => {
		setPass(event.target.value)
	}
	async function handleSubmit(e) {
		e.preventDefault()

		try {
			setError('')
			setLoading(true)
			await signup(email, pass)

			addTodo({
				variables: {
					input:
						{ name: fname + ' ' + lname, email: email, pic: 'User.png' }
				}
			})

			history.push('/dashboard')
		} catch {
			setError('Failed to create an account')
		}

		setLoading(false)
	}

	return (
		<div className="container">
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					{<img src="/static/companyLogo.png" alt="company logo" style={{height:'150px', width:'150px'}}/>}

					<Typography component="h1" variant="h5">
						Sign up
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleSubmit}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete="fname"
									name="firstName"
									variant="outlined"
									required
									fullWidth
									id="firstName"
									label="First Name"
									autoFocus
									onChange={firstNameChange}

								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									name="lastName"
									autoComplete="lname"
									onChange={lastNameChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									id="email"
									label="Email Address"
									name="email"
									autoComplete="email"
									onChange={emailChange}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									required
									fullWidth
									name="password"
									label="Password"
									type="password"
									id="password"
									autoComplete="current-password"
									onChange={passwordChange}
								/>
							</Grid>
						</Grid>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Sign Up
						</Button>
						<Grid container justify="flex-end">
							<Grid item>
								<Link to="/" className="">
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={5} />
			</Container>
		</div>
	)
}
export default Signup
