import React from 'react'
import { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from '../contexts/AuthContext'
import { gql, useQuery } from '@apollo/client'
import { GET_PROFILE_NAME } from '../graphql/queries'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
	card: {
		width: '100%',
		display: 'flex',

		flexDirection: 'column',
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}))
const Profile = (props) => {
	const classes = useStyles()
	const [adminEmail , setAdminEmail] = useState('todo get query admin email')

	const setAdmin = (event) =>{
		setAdminEmail(event.target.value)
	}
	return (

		<div className="Profile">
			<Container maxWidth="lg">

				<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
					User Profile
				</Typography>

				<img
					alt=" logo" height="175px"
					src="https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button-by-vexels.png"
				/>
				<Card className={classes.card}>

					<CardContent width="100%">
						<Typography gutterBottom variant="h5" component="h1">
							Profile Information
						</Typography>
						<Typography gutterBottom variant="h6" component="h4">
							name : {props.name}
						</Typography>
						<Typography gutterBottom variant="h6" component="h4">
							Email : {props.email}
						</Typography>
						<Typography gutterBottom variant="h6" component="h4">
							Admin Email : {adminEmail}
						</Typography>
						
						
					</CardContent>
				</Card>

				<Card className={classes.card}>
				<CardContent width="100%">
				<Typography gutterBottom variant="h5" component="h1">
							Set Admin Information 
						</Typography>
				<TextField
									autoComplete="fname"
									name="firstName"
									variant="outlined"
									required
									fullWidth
									id="adminEmail"
									label="Admin Email"
									autoFocus
									onChange={setAdmin}
								

								/>

						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Set New Admin 
						</Button>


                </CardContent>
				</Card>

			</Container>
		</div>
	)
}
const callSetName = () => {
	const { currentUser } = useAuth()
	const email = currentUser.email
	const { loading, error, data } = useQuery(GET_PROFILE_NAME, {
		variables: { email }
	})
	if (loading) return <div>Loading...</div>
	if (error) return `Error! ${error.message}`
	return <Profile name={data['Users'][0].name} email={email} />
}
export default callSetName
