import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC7gUGZf5h27Sl9HVRC5_inK7yDsmqQVD8",
  authDomain: "lukwagojoeljr.firebaseapp.com",
  projectId: "lukwagojoeljr",
  // storageBucket must be the appspot.com bucket
  storageBucket: "lukwagojoeljr.appspot.com",
  messagingSenderId: "164680526684",
  appId: "1:164680526684:web:ec4cf81543503a26caaf99",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
let storage;
try {
  storage = getStorage(app);
} catch (e) {
  // surface storage init errors in console (helps debug client/server mismatches)
  console.error("Firebase storage init error:", e);
}

export { db, storage };
