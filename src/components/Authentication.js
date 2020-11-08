import firebase from 'firebase';
import credentials from './config.js';

 const firebaseConfig = {
    apiKey: credentials.apiKey,
    authDomain: credentials.authDomain,
    databaseURL: credentials.databaseURL,
    projectId: credentials.projectId,
    storageBucket: credentials.storageBucket,
    messagingSenderId: credentials.messagingSenderId,
    // TODO get from Socket.io connection from env from server 
    appId: credentials.appId,
    measurementId: credentials.measurementId,
  };
  // Initialize Firebase
  const fire = firebase.initializeApp(firebaseConfig);
  fire.analytics();
  export default fire;