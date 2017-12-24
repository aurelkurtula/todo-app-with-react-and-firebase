import Rebase from "re-base";
import firebase from 'firebase';
import { read } from "fs";
const config = {
  apiKey: "AIzaSyDkNkm2qMhZJpqEPpBhp5D8AUADGL7I7iI",
    authDomain: "for-the-devs-248bd.firebaseapp.com",
    databaseURL: "https://for-the-devs-248bd.firebaseio.com",
    projectId: "for-the-devs-248bd",
    storageBucket: "for-the-devs-248bd.appspot.com",
    messagingSenderId: "623264827132"
};
/*
  firebase has authentication build in and 
    rebase use to handle the authentication but it now just deals with the data
  so the authentication is handled by firebase, hance:
    export `app` for authentication
    export `base` for handling data from firebase.
*/
const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
/*
  We also enabled facebook authentication in the firebase console. 
  Let's initialise it here too
*/

const facebookProvider = new firebase.auth.FacebookAuthProvider();



export { app, base, facebookProvider }