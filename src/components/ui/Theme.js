import { createMuiTheme } from '@material-ui/core/styles'

const drk = '#1c242c'
const lht = '#30344c'
const contrast = '#647cec'

export default createMuiTheme({
	palette: {
		common: {
			black: `${drk}`,
			white: `${lht}`
		},
		primary: {
			main: `${drk}`,
		},
		secondary: {
			main: `${lht}`,
		}
	},
	button: {
		background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
		color: 'white',
		textAlign: 'center',
		fontSize: '20px',
		fontFamily: 'Roboto, sans-serif'
	},
	typography: {
		tab: {},
		search: {},
		paper: {},
		MuiTabs: {
			TabIndicatorProps: {
				root: {
					transition: false
				}
			}
		},
		divide: {
			marginTop: '2rem',
		},
		switchTemp: {
			borderRadius: '10px',
			fontSize: '1.2rem',
		}
	},
})
