import React from 'react'
import { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from '../contexts/AuthContext'
import { gql, useQuery } from '@apollo/client'
import { GET_PROFILE_NAME } from "../graphql/queries"
const useStyles = makeStyles((theme) => ({

	card: {
		width: '100%',
		display: 'flex',

		flexDirection: 'column',
	},
}))
const Profile = () => {
	const classes = useStyles()
	const { currentUser } = useAuth()
	const email = currentUser.email
	const {loading ,error,data} = useQuery(GET_PROFILE_NAME,{
		variables:{email}
	})

	if (loading) return <div>'Loading...'</div>
	if (error) return `Error! ${error.message}`

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
						<Typography gutterBottom variant="h5" component="h2">
							Profile Information
						</Typography>
						<Typography component="h1">
							name:
							{' '}

							{data['Users'][0].name}
							<br />
							{' '}
							<br />

							{' '}
							<br />
							{' '}
							<br />
							Email:
							{email}

							{' '}
							<br />
							{' '}
							<br />

						</Typography>
					</CardContent>
				</Card>
				
			</Container>
		</div>
	)
}
export default Profile
