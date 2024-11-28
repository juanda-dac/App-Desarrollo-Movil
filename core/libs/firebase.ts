// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyDWfFuBnAb269JertMeFehZkKHtLCM8010",
  authDomain: "deliveries-2111a.firebaseapp.com",
  databaseURL: "https://deliveries-2111a-default-rtdb.firebaseio.com",
  projectId: "deliveries-2111a",
  storageBucket: "deliveries-2111a.firebasestorage.app",
  messagingSenderId: "1005526478009",
  appId: "1:1005526478009:web:b46a94c565a1671b5b7f68"
};

export const app = initializeApp(firebaseConfig);
