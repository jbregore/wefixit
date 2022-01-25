import firebase from "firebase";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAX3j6v_Pj8MsdHhQ_fWQhUvLw6FNRcxpg",
  authDomain: "wefixit-f6dda.firebaseapp.com",
  projectId: "wefixit-f6dda",
  storageBucket: "wefixit-f6dda.appspot.com",
  messagingSenderId: "1006105394846",
  appId: "1:1006105394846:web:bcb6182e92cf8debfe458f",
  measurementId: "G-NSSC0NRE3C"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default firebase;

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);