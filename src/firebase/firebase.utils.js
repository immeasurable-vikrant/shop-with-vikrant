import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const config = {
  apiKey: 'AIzaSyAPa73Gbxn1OabbIr6Y05bVokSlo0u-rAU',
  authDomain: 'shopwithvikrant-db.firebaseapp.com',
  projectId: 'shopwithvikrant-db',
  storageBucket: 'shopwithvikrant-db.appspot.com',
  messagingSenderId: '590405283628',
  appId: '1:590405283628:web:2e5d73b337011463728689',
  measurementId: 'G-M2XHWW1BJH',
};

const app = initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const firestore = getFirestore(app);
  const userRef = doc(firestore, `users/${userAuth.uid}`);
  const snapshot = await getDoc(userRef);

  if (!snapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = getAuth(app);
export const firestore = getFirestore(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default app;