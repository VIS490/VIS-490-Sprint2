<h1 align="center">Welcome to Vis 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
</p>

> Vis is a application that allows Team leaders to have better insights on their team's mental wellbeing with surveys. The Team Leaders can then see the average of the overall Team’s mental wellbeing score keeping users anonymous.  Users can see their own past historical data as well , helping them continue to grow. Please note that this app is not  HIPAA compliant and this is a prototype 

### 🏠 [VIS Homepage](https://still-ravine-46486.herokuapp.com)


## Authors

👤 **Vrushali Koli**
* Github: [@Vrushali](https://github.com/vkoli)
* LinkedIn: [@Vrushali](https://www.linkedin.com/in/vk801/)

👤 **Brandon Rodriguez**
* Github: [@Brandon](https://github.com/brandonRodriguez24)
* LinkedIn: [@Brandon](https://www.linkedin.com/in/brandon-rodriguez-5a2274201/)

👤 **Ronak Pasricha**
* Github: [@Ronak](https://github.com/rpasricha45)
* LinkedIn: [@Ronak](https://www.linkedin.com/in/ronak-pasricha/)

👤 **Anshul Mistry**
* Github: [@ammist07](https://github.com/ammist07)
* LinkedIn: [@anshulmistry](https://linkedin.com/in/anshulmistry)

## Documentation Links
* Flask: [@Flask](https://flask.palletsprojects.com/en/1.1.x/api/)
* Hasura: [@Hasura](https://hasura.io/docs/1.0/graphql/core/index.html)
* Heroku: [@Heroku](https://devcenter.heroku.com/categories/reference)
* Firebase: [@Firebase](https://firebase.google.com/?gclid=Cj0KCQiA5bz-BRD-ARIsABjT4njI9dq7z4jlUh2PmOfhRvgbUAg34I1UE9ioHimnHi-azTR8xpbGGkUaAk86EALw_wcB)
* Socket Io-Flask: [@Socket Io-Flask](https://flask-socketio.readthedocs.io/en/latest/)
* React: [@React](https://reactjs.org/docs/getting-started.html)
* Material UI: [@Material-UI](https://material-ui.com)

## Install
Step 1
```sh
git clone https://github.com/VIS490/VIS-490-Sprint2.git
```
Step 2
```sh
pip3 install -r requirements.txt
```
This will download all the requirements for you Flask-Socketio-Python Backend Application

Step 3
```sh
yarn or npm install
```
This will download all the requirements for you React-Socketio Frontend Application
Step 4
```sh
touch .env
```
Run the Command above, to make a env file, in your root project directory

Step 5
```sh
REACT_APP_FIREBASE_API_KEY=*****
REACT_APP_FIREBASE_AUTH_DOMAIN=*****
REACT_APP_FIREBASE_DATABASE_URL=*****
REACT_APP_FIREBASE_PROJECT_ID=*****
REACT_APP_FIREBASE_STORAGE_BUCKET=*****
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=*****
REACT_APP_FIREBASE_APP_ID=*****
REACT_APP_MEASUREMENT_ID=*****
REACT_APP_HASURA_ADMIN_SECRET=*****
```
This is your env file
- All you keys will be in this .env file
- All firebase, hasura keys will in here

## Setting Up Firebase
- Start by going to ``Firebase`` site and create a project
- Make and account and click ``Get Started``, then click ``Add project``
- Give you app a Name, select ``Default Account for Firebase``, finally click Create Project!
- On the Home Page select, the option ``Web App``, give you app a name
- Firebase will give the ``Firebase SDK`` take the values of the variables and add them to the ``.env`` file exactly
- After this, your app will be connected to Firebase
- Enable Google Auth and Sign in with Email/Password in the Firebase
## Setting Up Hasura
- Create a New Project, pick a region closest to you, and give it a name
- Next Step is to set up a db, now you have to Sign Up with Heroku and create project with a Postgress DB, I have linked the Heroku docs above
- Input put the DB URL, which you get with Heroku and create the app
```sh
HASURA_GRAPHQL_JWT_SECRET = {
    "type":"RS256",
    "jwk_url": "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
    "audience": "<firebase-project-id>",
    "issuer": "https://securetoken.google.com/<firebase-project-id>"
}
HASURA_GRAPHQL_ADMIN_SECRET = youradminsecret
```
- You need add these variables in the ``Config Vars in Heroku``
- These will enable you to make Hasura GraphQL Queries and Mutations
- The next is to make your DB tables in Hasura
- ``tables_ddl.pdf`` this a file with all the Tables which can be used to make the Database
- Use the SQL file to make your tables
## Run the App
- Open the App in VSCODE or any other editor
- Run Commands
```sh
npm run dev 
```
```sh
python app.py
```
## Issues (Obstacles)
- Firebase Integration
- Hasura Query and Mutations
- UI Styling for Components
- Datbase Schema connections between tables 
- Signup bugs - fixing edge cases 

## Issues Still Persist
- Did not calculate  the average of scores via Hasura 
## Show your support

Give a ⭐️ if this project helped you!

***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_
