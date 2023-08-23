
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCD3knIXlHYrQ59kju69nGNIVmecDePquo",
    authDomain: "company-91cbb.firebaseapp.com",
    projectId: "company-91cbb",
    storageBucket: "company-91cbb.appspot.com",
    messagingSenderId: "262051787284",
    appId: "1:262051787284:web:de55a974de8bac61d7ed01"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
