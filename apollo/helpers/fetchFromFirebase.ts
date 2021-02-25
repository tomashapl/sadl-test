import firebase from "firebase/app";
import { firebasePool } from "../firebase";

const fetchFromFirebase = async (
  ref: string,
  event: firebase.database.EventType
) => {
  const fetch = firebasePool().database().ref(ref);
  const snapshot = await fetch.once(event);
  return snapshot.val();
};

export default fetchFromFirebase;
