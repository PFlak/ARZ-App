import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./src/config/FirebaseConfig";
import { getAuth } from "firebase/auth";

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
