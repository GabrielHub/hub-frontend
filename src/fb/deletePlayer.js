import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';

export const deletePlayer = async (uid) => {
  const playerRef = doc(db, 'players', uid);
  try {
    await deleteDoc(playerRef);
  } catch (err) {
    throw new Error(err);
  }
};

export default {};
