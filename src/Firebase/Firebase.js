import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDI2HqbKUvchq-IOGh7XvOcRmtJVejl4pU",
    authDomain: "react-mail-c09ee.firebaseapp.com",
    projectId: "react-mail-c09ee",
    storageBucket: "react-mail-c09ee.appspot.com",
    messagingSenderId: "330341280936",
    appId: "1:330341280936:web:891edbb2a2977f0a82e69d"
};

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export { firebase, firestore };
