import React from 'react'
import { useState, useEffect } from 'react'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from '../contexts/AuthContext'
import { gql, useQuery, useMutation } from '@apollo/client'
import { GET_PROFILE_NAME } from '../graphql/queries'
import { UPDATE_USER_ADMIN } from '../graphql/mutations'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'

const useStyles = makeStyles((theme) => ({
	Profile:{
		margin: 'auto',
		padding: 'auto',
		height: '100%',
		float: 'left',
		textAlign: 'center', 
		verticalAlign: 'middle',
		marginLeft:'30%'
	},
	card: {
		display: 'flex',
		width:'100%',
		marginTop:'10%',
		marginBottom:'10%',
		flexDirection: 'column',
	},
	teamLeader :{
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	}
}))
const Profile = (props) => {
	const classes = useStyles()
	const [adminEmail , setAdminEmail] = useState(props.admin)
	const [updateAdminEmail,{ loading: mutationLoading, error: mutationError },] = useMutation(UPDATE_USER_ADMIN)

	const setAdmin = (event) =>{
		setAdminEmail(event.target.value)
	}

	const handleClick = (event) => {
		event.preventDefault()
		console.log('in handle click')
		updateAdminEmail({
			variables: {
				'_set':{
					'admin_email': adminEmail
				},
				'where': {
					'email':{
						'_eq': props.email
					}
				}
			}
		})
	}
	return (
		<div className={classes.Profile}>
			<Container >
				<img src="/static/settings.png" alt="settings logo" style={{height:'55%', width:'25%'}}/>
				
				<Card className={classes.card} raised={true}>
					<CardContent width="100%">
						<Typography gutterBottom variant="h5" component="h1">
							Profile Information
						</Typography>
						<Typography gutterBottom variant="h6" component="h4">
							Name : {props.name}
						</Typography>
						<Typography gutterBottom variant="h6" component="h4">
							Email : {props.email}
						</Typography>
						<Typography gutterBottom variant="h6" component="h4">
							Team Leader Email : {adminEmail}
						</Typography>
					</CardContent>
				</Card>
				<Card className={classes.teamLeader} raised={true}>
					<CardContent width="100%">
						<Typography gutterBottom variant="h5" component="h1">
							Set New Team Leader Email
						</Typography>
						<TextField
							autoComplete="fname"
							name="firstName"
							variant="outlined"
							required
							fullWidth
							id="Team Leader "
							label="Team Leader Email"
							autoFocus
							onChange={setAdmin}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
							onClick={handleClick}
						>
							Set New Team Leader 
						</Button>
						{mutationLoading && <p>Loading...</p>}
						{mutationError && <p>Error :( Please try again</p>}
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
	return <Profile name={data['Users'][0].name} email={email} admin={data['Users'][0].admin_email}/>
}
export default callSetName
