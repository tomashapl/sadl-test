import firebase from "firebase";
import { firebasePool } from "../firebase";

async function fetchFromFirebase<T>(
  ref: string,
  event: firebase.database.EventType
): Promise<T> {
  const fetch = firebasePool().database().ref(ref);
  const snapshot = await fetch.once(event);
  return snapshot.exportVal();
}

export default fetchFromFirebase;
