import React from 'react'
import  { useState,useEffect } from 'react'
import Card from '@material-ui/core/Card'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import { makeStyles } from '@material-ui/core/styles'
import { useAuth } from "../contexts/AuthContext"
import { postAxios } from '../postAxios'
// import { GET_CURRENT_USER} from '../graphql/query'
import { gql, useQuery, useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({

	card: {

		width: '100%',	
		display: 'flex',

		flexDirection: 'column',
	},
}))



const Profile = (props) => {
	const classes = useStyles()
	const { login, currentUser } = useAuth()
	const [currentUserName , setName] = useState("");
	const [email, setEmail] = useState(currentUser.email);

	const condition = ' where: {email: {_eq: ' + '"'+email+'"' + '}}';
		const queryString = `
		query  {
			Users(
				` + condition + `
			  ) {
				name
			  }
		  }`
		  const GET_CURRENT_USER = gql `${queryString}`;
	
	const setUserName = async () =>{
		const  {data}  =  await useQuery(GET_CURRENT_USER);
		let name = data["Users"][0].name;
		setName(name);
	}


	
	setUserName();
	// useEffect(() => {
		

	//   });

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
							
							{currentUserName}
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
				;
			</Container>
		</div>
	)
}
export default Profile
