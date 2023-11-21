import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyCtIWE_WIHRstcDrSMd6vvkk23cYn6bcgU",
  authDomain: "alex-clothing-4c0bd.firebaseapp.com",
  projectId: "alex-clothing-4c0bd",
  storageBucket: "alex-clothing-4c0bd.appspot.com",
  messagingSenderId: "433713527022",
  appId: "1:433713527022:web:9f44d696860ff456819bff",
  measurementId: "G-S33WKGNFZP",
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
