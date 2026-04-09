import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: 'wordsera-f5af3.firebaseapp.com',
  projectId: 'wordsera-f5af3',
  storageBucket: 'wordsera-f5af3.firebasestorage.app',
  messagingSenderId: '1093289348411',
  appId: '1:1093289348411:web:89540d37a57ffcc84cbb1e',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
