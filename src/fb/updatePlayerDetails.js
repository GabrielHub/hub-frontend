import { doc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';

export const updatePlayerDetails = async (uid, name, alias, ftPerc) => {
  const playerRef = doc(db, 'players', uid);
  try {
    await updateDoc(playerRef, { name, alias, ftPerc });
  } catch (err) {
    throw new Error(err);
  }
};

export default {};
