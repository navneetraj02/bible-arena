import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCNud84Mw39PNs-ZBk9Ccfx0z360Yo8Ncs",
  authDomain: "bible-arena.firebaseapp.com",
  projectId: "bible-arena",
  storageBucket: "bible-arena.firebasestorage.app",
  messagingSenderId: "296264321498",
  appId: "1:296264321498:web:59b1819ff970e4bedbd8e3",
  measurementId: "G-GSSX7S5KFB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);

// Initialize Analytics (only in browser and when supported)
export const initAnalytics = async () => {
  if (typeof window !== 'undefined' && await isSupported()) {
    return getAnalytics(app);
  }
  return null;
};

export default app;
