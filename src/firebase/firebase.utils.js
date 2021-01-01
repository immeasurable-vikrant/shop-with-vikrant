import firebase from 'firebase/app';

//for database
import 'firebase/firestore';
//for authentication
import 'firebase/auth';

const config = {
  apiKey: 'AIzaSyAPa73Gbxn1OabbIr6Y05bVokSlo0u-rAU',
  authDomain: 'shopwithvikrant-db.firebaseapp.com',
  projectId: 'shopwithvikrant-db',
  storageBucket: 'shopwithvikrant-db.appspot.com',
  messagingSenderId: '590405283628',
  appId: '1:590405283628:web:2e5d73b337011463728689',
  measurementId: 'G-M2XHWW1BJH',
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapshot = await userRef.get();
  console.log('ssssssssssssssss', snapshot);
  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    console.log('userAuth', userAuth);
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
};

//initialization of App
firebase.initializeApp(config);

//(.)auth method on firebase
export const auth = firebase.auth();

//(.)firestore method on firebase
export const firestore = firebase.firestore();

//google authentication utility
const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
