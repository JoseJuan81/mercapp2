import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
	apiKey: "AIzaSyDWpTtEOwCLW3Ffmlf03Mqh6xqjIR5s1xM",
	authDomain: "mercapp2-63877.firebaseapp.com",
	projectId: "mercapp2-63877",
	storageBucket: "mercapp2-63877.appspot.com",
	messagingSenderId: "804004365139",
	appId: "1:804004365139:web:167504f95a9721db49d7a6",
	measurementId: "G-GS32Z3RQRS"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
	db,
	firebase,
	googleAuthProvider
}