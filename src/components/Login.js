import React from 'react'
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
import { Link } from 'react-router-dom'

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
}))

const Login = ({ userlogin, setUserEmail, setUserPass }) => {
	const classes = useStyles()

	const emailChange = (event) => {
		setUserEmail(event.target.value)
	}

	const passwordChange = (event) => {
		setUserPass(event.target.value)
	}
	const handleLogin = (event) => {
		event.preventDefault()
		userlogin()
	}
	return (
		<div className="container">
			<Container component="main" maxWidth="xs">
				<CssBaseline />
				<div className={classes.paper}>
					{/* <img src={'../../static/companyLogo.png'} alt="" /> */}
					<Typography component="h1" variant="h5">
						Sign in
					</Typography>
					<form className={classes.form} noValidate onSubmit={handleLogin}>
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
						<FormControlLabel
							control={<Checkbox value="remember" color="primary" />}
							label="Remember me"
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
						<Grid container>
							<Grid item xs>
								<div href="#" variant="body2">
									Forgot password?
								</div>
							</Grid>
							<Grid item>
								<Button to="/signup" component={Link}>
									{'Don\'t have an account? Sign Up'}
								</Button>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={8} />
			</Container>
		</div>
	)
}
export default Login
