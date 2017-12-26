import firebase from 'firebase';
const config = {
  apiKey: "*********",
    authDomain: "*********",
    databaseURL: "*********",
    projectId: "*********",
    storageBucket: "*********",
    messagingSenderId: "*********2"
};
const fire = firebase.initializeApp(config)
export { fire }