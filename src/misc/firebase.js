import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyC810ytH9ssd4azUQU0lqwD8O78pjQjV1g",
  authDomain: "chat-web-app-34e5d.firebaseapp.com",
  databaseURL:
    "https://chat-web-app-34e5d-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "chat-web-app-34e5d",
  storageBucket: "chat-web-app-34e5d.appspot.com",
  messagingSenderId: "894622959694",
  appId: "1:894622959694:web:dc27cde4a6da3cbc0c1b1f",
};

const app = firebase.initializeApp(config);

export const auth = app.auth();
export const database = app.database();
