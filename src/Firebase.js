
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAHSps57hmvnuveTcvoPrKQ96bRlgJrPXE",
  authDomain: "chatapp-8ba0e.firebaseapp.com",
  projectId: "chatapp-8ba0e",
  storageBucket: "chatapp-8ba0e.appspot.com",
  messagingSenderId: "203748005763",
  appId: "1:203748005763:web:6506654d54fa92ee2588b6",
  measurementId: "G-S9R5Q3V98X"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);