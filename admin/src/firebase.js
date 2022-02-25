// Includes All Firebase Configuration
// Using Firebase to upload new product image from system (laptop/mobile) and get the response from Firebase as image URL
// This image URL provide by Firebase will be used in MongoDB database to save the new product


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgESwUXduSNspgGycdRJjCfGtfrO5Gsjo",
  authDomain: "ecommerce-project-2c441.firebaseapp.com",
  projectId: "ecommerce-project-2c441",
  storageBucket: "ecommerce-project-2c441.appspot.com",
  messagingSenderId: "923734721275",
  appId: "1:923734721275:web:8fa76d2e6d55bbb7cb265e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;


















