/**
 * Akshat Estate - Firebase configuration (shared by the public site and admin.html)
 *
 * These web-app keys are meant to be public; they identify the project, they do not
 * grant access. What protects your data is firestore.rules + Firebase Authentication.
 * Still, in Google Cloud Console > APIs & Services > Credentials you can restrict this
 * API key to your website's domain(s).
 *
 * FIREBASE_VERSION is the single place to change the Firebase JS SDK version.
 */
export const FIREBASE_VERSION = "12.19.0";

export const firebaseConfig = {
  apiKey: "AIzaSyB5maMRGh2bfw-XH_oF3gS5DxquKKDmte0",
  authDomain: "akshatestate-c9868.firebaseapp.com",
  projectId: "akshatestate-c9868",
  storageBucket: "akshatestate-c9868.firebasestorage.app",
  messagingSenderId: "1041845994097",
  appId: "1:1041845994097:web:9929ec06a831bf395211d0",
  measurementId: "G-L1Q6K3K2JQ"
};
