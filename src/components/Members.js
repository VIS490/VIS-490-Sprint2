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
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
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
	media: {           
		height: 150,    
		width: '19%',
		marginLeft: '33%'
	},
	users:{
		// overflow: 'auto',
	},
	card :{
		width: '100%',
	}

      

    
}))

const Members = () => {
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
					<CardMedia
						component="img"
						alt="Company Logo"
						className={classes.media}
						image="/static/companyLogo.png"
						title="Company Logo"
					/>
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
						{[0, 1, 2, 3,4,5,6,7].map((value) => {
							const labelId = `checkbox-list-secondary-label-${value}`
							return (
								<ListItem key={value} className={classes.users} button >
									<ListItemAvatar>
										<Avatar className={classes.purple}></Avatar>
									</ListItemAvatar>
									<ListItemText id={labelId}   classes={{primary:classes.listItemText}} primary={`User ${value + 1}`} />
									<ListItemSecondaryAction>
										<Checkbox
											edge="end"
											onChange={handleToggle(value)}
											checked={checked.indexOf(value) !== -1}
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
export default Members