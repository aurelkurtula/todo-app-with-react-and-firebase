import firebase from 'firebase';
const config = {
  apiKey: "AIzaSyDkNkm2qMhZJpqEPpBhp5D8AUADGL7I7iI",
    authDomain: "for-the-devs-248bd.firebaseapp.com",
    databaseURL: "https://for-the-devs-248bd.firebaseio.com",
    projectId: "for-the-devs-248bd",
    storageBucket: "for-the-devs-248bd.appspot.com",
    messagingSenderId: "623264827132"
};
const fire = firebase.initializeApp(config)
export { fire }