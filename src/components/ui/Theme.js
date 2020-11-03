import {createMuiTheme} from '@material-ui/core/styles';

const lht = '#B8E1FB'
const drk = '#00172D'

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