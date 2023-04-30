import firebase from "firebase/app";
import "firebase/auth";

export const auth = firebase.initializeApp({
    apiKey: "AIzaSyDm5dmNbCvXDyI0BnYV4Iy-vmgEFG51hx0",
    authDomain: "botogram-5fa20.firebaseapp.com",
    projectId: "botogram-5fa20",
    storageBucket: "botogram-5fa20.appspot.com",
    messagingSenderId: "750260640987",
    appId: "1:750260640987:web:b4c2c20da9d6b850ed80fe",
    measurementId: "G-TFJXCWFP2X"
  }).auth();