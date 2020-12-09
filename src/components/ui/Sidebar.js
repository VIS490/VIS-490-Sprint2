import React, {useState, useEffect} from 'react'
import {makeStyles} from '@material-ui/styles'
import {Typography} from '@material-ui/core'
import {Link} from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import SettingsIcon from '@material-ui/icons/Settings'
import DashboardIcon from '@material-ui/icons/Dashboard'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import GroupIcon from '@material-ui/icons/Group'
import AssessmentIcon from '@material-ui/icons/Assessment'
import {useAuth} from '../../contexts/AuthContext'

const useStyles = makeStyles((theme) => ({
	sidebar: {
		background: theme.palette.primary.main,
		width: '20%',
		height: '100%',
		position: 'absolute',
		marginLeft: '0',
		top: '0',
		bottom: '0',
		display: 'flex',
		float: 'left',
		flexDirection: 'column'
	},
	header: {
		textAlign: 'center',
		objectFit: 'cover',
		float: 'left',
		color: 'white',
		marginBottom: '20%',
		paddingTop: '5%',
		paddingBottom: '5%',
		scrollPaddingBottom: '5%',
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
	},
	listItem: {
		...theme.button,
		margin: '10px 0 10px 0',
		marginBottom: '5%'
	},
	sidebarBody: {
		flexGrow: 1,
		textAlign: 'center'
	},
	name: {
		color: 'white',
		textDecoration: 'none',
	},
	logout: {
		...theme.button,
		margin: '10px 0 10px 0',
		marginTop: '20%'
	}

}))

const Sidebar = () => {
	const classes = useStyles()
	const [value, setValue] = useState(0)
	const {isAdmin} = useAuth()

	useEffect(() => {
		if (window.location.pathname === '/' && value !== 0) {
			setValue(0)
		} else if (window.location.pathname === '/dashboard' && value !== 1) {
			setValue(1)
		} else if (window.location.pathname === '/profile' && value !== 2) {
			setValue(2)
		} else if (window.location.pathname === '/quiz' && value !== 3) {
			setValue(3)
		} else if (window.location.pathname === '/admin-dash' && value !== 4) {
			setValue(4)
		} else if (window.location.pathname === '/team' && value !== 5) {
			setValue(5)
		}
	}, [])

	const handleChange = (e, value) => {
		setValue(value)
	}
	const user = (
		<div className={classes.sidebar}>
			<div className={classes.header}>
				{<img src="../../static/companyLogo.png" alt="Vis" style={{height: 161, width: 299}}/>}
				{/* <Typography  className={classes.name}  variant="h4"  label="Home">Vis</Typography> */}
			</div>
			<div className={classes.sidebarBody}>
				<List onChange={handleChange} className={classes.sidebarBody} disablePadding>
					<ListItem selected={value === 2} className={classes.listItem} divider button component={Link} to="/profile" label="Profile" onClick={() => {
						setValue(2)
					}}>
						<ListItemIcon>
							<SettingsIcon/>
						</ListItemIcon>
						<ListItemText disableTypography>Settings</ListItemText>
					</ListItem>
					<ListItem selected={value === 1} className={classes.listItem} divider button component={Link} to="/dashboard" label="Dashboard" onClick={() => {
						setValue(1)
					}}>
						<ListItemIcon>
							<AssessmentIcon/>
						</ListItemIcon>
						<ListItemText disableTypography>Dashboard</ListItemText>
					</ListItem>
					<ListItem selected={value === 3} className={classes.listItem} divider button component={Link} to="/quiz" label="Quiz" onClick={() => {
						setValue(3)
					}}>
						<ListItemIcon>
							<QuestionAnswerIcon/>
						</ListItemIcon>
						<ListItemText disableTypography>Survey</ListItemText>
					</ListItem>
					<ListItem selected={value === 6} className={classes.logout} divider button component={Link} to="/" label="logout" onClick={() => {
						setValue(6)
					}}>
						<ListItemIcon>
							<ExitToAppIcon/>
						</ListItemIcon>
						<ListItemText disableTypography>Logout</ListItemText>
					</ListItem>
				</List>
			</div>
		</div>
	)
	const admin = (
		<div className={classes.sidebar}>
			<div className={classes.header}>
				{<img src="../../static/companyLogo.png" alt="Vis" style={{height: 161, width: 299}}/>}
				{/* <Typography  className={classes.name}  variant="h4"  label="Home">Vis</Typography> */}
			</div>
			<div className={classes.sidebarBody}>
				<List onChange={handleChange} className={classes.sidebarBody} disablePadding>
					<ListItem selected={value === 2} className={classes.listItem} divider button component={Link} to="/profile" label="Profile" onClick={() => {
						setValue(2)
					}}>
						<ListItemIcon>
							<SettingsIcon/>
						</ListItemIcon>
						<ListItemText disableTypography>Settings</ListItemText>
					</ListItem>
					<ListItem selected={value === 1} className={classes.listItem} divider button component={Link} to="/dashboard" label="Dashboard" onClick={() => {
						setValue(1)
					}}>
						<ListItemIcon>
							<AssessmentIcon/>
						</ListItemIcon>
						<ListItemText disableTypography>Dashboard</ListItemText>
					</ListItem>
					<ListItem selected={value === 3} className={classes.listItem} divider button component={Link} to="/quiz" label="Quiz" onClick={() => {
						setValue(3)
					}}>
						<ListItemIcon>
							<QuestionAnswerIcon/>
						</ListItemIcon>
						<ListItemText disableTypography>Survey</ListItemText>
					</ListItem>
					<ListItem selected={value === 4} className={classes.listItem} divider button component={Link} to="/admin-dash" label="Admin Dashboard" onClick={() => {
						setValue(4)
					}}>
						<ListItemIcon>
							<DashboardIcon/>
						</ListItemIcon>
						<ListItemText disableTypography>Admin Dashboard</ListItemText>
					</ListItem>
					<ListItem selected={value === 5} className={classes.listItem} divider button component={Link} to="/team" label="Team" onClick={() => {
						setValue(5)
					}}>
						<ListItemIcon>
							<GroupIcon/>
						</ListItemIcon>
						<ListItemText disableTypography>Team</ListItemText>
					</ListItem>
					<ListItem selected={value === 6} className={classes.logout} divider button component={Link} to="/" label="logout" onClick={() => {
						setValue(6)
					}}>
						<ListItemIcon>
							<ExitToAppIcon/>
						</ListItemIcon>
						<ListItemText disableTypography>Logout</ListItemText>
					</ListItem>
				</List>
			</div>
		</div>
	)
	return (
		<React.Fragment>
			{isAdmin ? admin : user}
		</React.Fragment>
	)
}

export default Sidebar
