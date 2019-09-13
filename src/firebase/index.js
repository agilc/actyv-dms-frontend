import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import {
  firebaseApiKey,
  firebaseAuthDomain,
  firebaseDatabaseUrl,
  firebaseProjectId,
  firebaseStorageBucket,
  fireMessagingCenterId
} from '../constants/App';


// Initialize Firebase
const config = {
  apiKey: firebaseApiKey,
  authDomain: firebaseAuthDomain,
  databaseURL: firebaseDatabaseUrl,
  projectId: firebaseProjectId,
  storageBucket: firebaseStorageBucket,
  messagingSenderId: fireMessagingCenterId
};

firebase.initializeApp(config);
const auth = firebase.auth();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

const database = firebase.database();
export {
  auth,
  database,
  googleAuthProvider
};
