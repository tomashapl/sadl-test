import firebase from "firebase/app";

export const firebasePool = (): firebase.app.App => {
  if (firebase.app.length === 0) {
    return firebase.initializeApp({
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
    });
  } else {
    return firebase.app();
  }
};
