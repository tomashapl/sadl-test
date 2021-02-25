import { default as firebaseBase } from "firebase";

export const firebasePool = (): firebaseBase.app.App => {
  if (firebaseBase.apps.length === 0) {
    return firebaseBase.initializeApp({
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      databaseURL: process.env.DATABASE_URL,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
    });
  } else {
    return firebaseBase.app();
  }
};
