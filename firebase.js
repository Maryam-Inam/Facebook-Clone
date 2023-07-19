import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBLDhN7HF7Cg79C1-GUwtYxdpLU-EhNFw4",
  authDomain: "facebook-clone-241b2.firebaseapp.com",
  projectId: "facebook-clone-241b2",
  storageBucket: "facebook-clone-241b2.appspot.com",
  messagingSenderId: "823298566095",
  appId: "1:823298566095:web:86fb4940b208c5344c94ba",
};

// Initialize Firebase
// const app = !firebase.app.length
//   ? firebase.initializeApp(firebaseConfig)
//   : firebase.app();
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const storage = app.storage();

export { db, storage };
