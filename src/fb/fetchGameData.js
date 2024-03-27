import { getDoc, doc } from 'firebase/firestore';
import { db } from './firebase';

export const fetchGameData = async (uid) => {
  const gameRef = doc(db, 'games', uid);
  const gameDoc = await getDoc(gameRef);
  return gameDoc.data();
};

export default {};
