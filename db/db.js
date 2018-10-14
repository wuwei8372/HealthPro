import Firebase from 'firebase';
var config = {
    apiKey: "AIzaSyAnb79wNGnzgjGwG42LqNKT35nW8BvuOPY",
    authDomain: "healthpro-8508b.firebaseapp.com",
    databaseURL: "https://healthpro-8508b.firebaseio.com",
    projectId: "healthpro-8508b",
    storageBucket: "healthpro-8508b.appspot.com",
    messagingSenderId: "250030420290"
  };
let app = Firebase.initializeApp(config);
export const db = app.database();