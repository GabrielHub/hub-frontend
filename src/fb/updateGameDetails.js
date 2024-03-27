import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const updateGameDetails = async (uid, gameData) => {
  const gameDoc = doc(db, 'games', uid);
  try {
    await updateDoc(gameDoc, gameData);
  } catch (err) {
    throw new Error(err);
  }
};

export default {};
