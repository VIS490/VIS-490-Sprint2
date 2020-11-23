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

const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		paddingLeft:theme.spacing(14),
		
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(25),
		overflow: 'auto',

	},
	purple: {
		...theme.button,
	},

    
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

			<List dense className={classes.cardGrid}>
				{[0, 1, 2, 3].map((value) => {
					const labelId = `checkbox-list-secondary-label-${value}`
					return (
        
						<ListItem key={value} button>
							<ListItemAvatar>
								<Avatar className={classes.purple}></Avatar>
							</ListItemAvatar>
							<ListItemText id={labelId} primary={`User ${value + 1}`} />
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
			<div className={classes.root}>
				<Button variant="contained" color="secondary" onClick={handleClick}>
                Remove User
				</Button>
			</div>
		</div>   
	)
}
export default Members