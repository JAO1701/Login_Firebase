import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// https://firebase.google.com/docs/web/setup#available-libraries

// App Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSMw8z6dc-dURNc3V7IvbLexnJGZpzDp4",
  authDomain: "dataevolutionpro.firebaseapp.com",
  projectId: "dataevolutionpro",
  storageBucket: "dataevolutionpro.appspot.com",
  messagingSenderId: "1040668578815",
  appId: "1:1040668578815:web:61b7a62d234ed33bf58dca"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)