// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCLOg0eU8GSk8mcht-SgNLctl_SubB5KEg',
  authDomain: 'e-commerce-57ad0.firebaseapp.com',
  projectId: 'e-commerce-57ad0',
  storageBucket: 'e-commerce-57ad0.appspot.com',
  messagingSenderId: '866621002779',
  appId: '1:866621002779:web:a7daa3fc0a6880992814be',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export default firebaseConfig;
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);
