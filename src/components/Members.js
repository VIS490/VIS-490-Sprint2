import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Checkbox from '@material-ui/core/Checkbox'
import Avatar from '@material-ui/core/Avatar'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardContent from '@material-ui/core/CardContent'
import { useAuth } from '../contexts/AuthContext'
import { gql, useQuery } from '@apollo/client'
import { GET_ADMIN_USERS } from '../graphql/queries'


import Paper from '@material-ui/core/Paper'
const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		paddingLeft:theme.spacing(14),
		
	},
	cardGrid: {
		width:'650px',
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(25),
		

	},
	purple: {
		...theme.button,
	},
	listItemText:{
		fontSize:'1.2em',
	},
	users:{
		borderTopWidth: 1, borderColor: theme.button ,borderStyle: 'solid'
        
	},
	card :{
		width: '100%',
	}

      

    
}))

const Members = (props) => {
	const classes = useStyles()
	const [checked, setChecked] = React.useState([1])

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value)
		const newChecked = [...checked]

		if (currentIndex === -1) {
			newChecked.push(value)
		} else {
			newChecked.splice(currentIndex, 1)
		}

		setChecked(newChecked)
	}
	const handleClick = (e) => {
	}
	return (
		<div>

			<Container maxWidth="md">
				<Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Team Members 
				</Typography>
			</Container>
			<Card className={classes.card}>
				<CardActionArea>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
            Manage Users 
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
            Remove Associated Users from admin 
						</Typography>
					</CardContent>
				</CardActionArea>
			</Card>
			<div className = "Users">
				<Paper style={{maxHeight: 500, overflow: 'auto',width:'100%'}}>
         
					<List dense className={classes.cardGrid}>
						{props.membersList.map((name,index) => {
							const labelId = `checkbox-list-secondary-label-${index}`
							return (
								<ListItem key={index} className={classes.users} borderColor="grey.500" button  >
									<ListItemAvatar>
										<Avatar className={classes.purple}></Avatar>
									</ListItemAvatar>
									<ListItemText id={labelId}   classes={{primary:classes.listItemText}} primary={`User ${name}`} />
									<ListItemSecondaryAction>
										<Checkbox
											edge="end"
											onChange={handleToggle(index)}
											checked={checked.indexOf(index) !== -1}
											inputProps={{ 'aria-labelledby': labelId }}
										/>
									</ListItemSecondaryAction>
								</ListItem>
                       
							)
						})}
					</List>
				</Paper>
			</div>
			<div className={classes.root}>
				<Button variant="contained" color="secondary" onClick={handleClick}>
                Remove User
				</Button>
			</div>
		</div>   
	)
}



const callSetName = () => {
	const { currentUser } = useAuth()
	const email = "rpasricha@gmail.com"
	const { loading, error, data } = useQuery(GET_ADMIN_USERS, {
		variables: { email }
	})
	if (loading) return <div>Loading...</div>
	if (error) return `Error! ${error.message}`
	console.log(data)
	let userList = []
	for (let i = 0; i <data['Users'].length; i++ ){
		let email=data['Users'][i]['email']
		userList.push(email)
	}
	return <Members membersList={userList } />
}
export default callSetName
