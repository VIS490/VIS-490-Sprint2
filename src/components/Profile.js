import React from 'react'
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

    card: {

        width: '100%',
        display: 'flex',

        flexDirection: 'column',
    },
}));

const Profile = () => {
    const classes = useStyles();

    return (

        <div className="Profile">
            <Container maxWidth="lg">

                <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    User Profile
            </Typography>

                <img alt=" logo" height="175px" src="https://images.vexels.com/media/users/3/147101/isolated/preview/b4a49d4b864c74bb73de63f080ad7930-instagram-profile-button-by-vexels.png" />
                <Card className={classes.card}>


                    <CardContent width="100%">
                        <Typography gutterBottom variant="h5" component="h2">
                            Profile Information
          </Typography>
                        <Typography component="h1">
                            full name: <strong> Please fetch from database</strong> <br /> <br />
            Profile Name: <strong> Please fetch from database</strong> <br /> <br />
            Email: <strong> Please fetch from database</strong> <br /> <br />
            Date Joined: <strong> Please fetch from database</strong> <br /> <br />
                        </Typography>
                    </CardContent>
                </Card>;
    </Container>
        </div>
    );
}
export default Profile;