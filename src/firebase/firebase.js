import { FIREBASE_KEY } from 'constants';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: 'gabrielhub-60a30.firebaseapp.com',
  projectId: 'gabrielhub-60a30',
  storageBucket: 'gabrielhub-60a30.appspot.com',
  messagingSenderId: '746245931286',
  appId: '1:746245931286:web:146fbb569d5c8d250a9037'
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default {};
