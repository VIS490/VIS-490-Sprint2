import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const useStyles = makeStyles((theme) => ({
	sidebar: {
		background: theme.palette.primary.main,
		width: '20%',
		height: '100vh',
		display: 'flex',
		flexDirection: 'column'

	},
	header: {
		textAlign: 'center',
		color: 'white',
		paddingTop: '5%',
		scrollPaddingBottom: '5%',
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
	},
	listItem: {
		...theme.button,
		margin: '10px 0 10px 0'
	},
	sidebarBody: {
		flexGrow: 1,
		textAlign: 'center'
	},
	name: {
		color: 'white',
		textDecoration: 'none',
	}

}))

const Sidebar = () => {
	const classes = useStyles()
	const [value, setValue] = useState(0)

	useEffect(() => {
		if (window.location.pathname === '/' && value !== 0) {
			setValue(0)
		} else if (window.location.pathname === '/dashboard' && value !== 1) {
			setValue(1)
		} else if (window.location.pathname === '/profile' && value !== 2) {
			setValue(2)
		} else if (window.location.pathname === '/quiz' && value !== 3) {
			setValue(3)
		}
	}, [])

	const handleChange = (e, value) => {
		setValue(value)
	}

	return (
		<div className={classes.sidebar}>
			<div className={classes.header}>
				<Typography selected={value === 0} className={classes.name} onChange={handleChange} onClick={() => { setValue(0) }} variant="h4" component={Link} to="/" label="Home">Vis</Typography>
			</div>
			<div className={classes.sidebarBody}>
				<List onChange={handleChange} className={classes.sidebarBody} disablePadding>
					<ListItem selected={value === 2} className={classes.listItem} divider button component={Link} to="/profile" label="Profile" onClick={() => { setValue(2) }}>
						<ListItemText disableTypography>Profile</ListItemText>
					</ListItem>
					<ListItem selected={value === 1} className={classes.listItem} divider button component={Link} to="/dashboard" label="Dashboard" onClick={() => { setValue(1) }}>
						<ListItemText disableTypography>Dashboard</ListItemText>
					</ListItem>
					<ListItem selected={value === 3} className={classes.listItem} divider button component={Link} to="/quiz" label="Quiz" onClick={() => { setValue(3) }}>
						<ListItemText disableTypography>Quiz</ListItemText>
					</ListItem>
				</List>
			</div>
		</div>
	)
}

export default Sidebar
