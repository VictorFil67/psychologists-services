// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FAREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FAREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FAREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FAREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FAREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FAREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FAREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FAREBASE_DATABASE_URL,
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
