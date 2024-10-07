import { doc, updateDoc, query, collection, where, getDocs } from 'firebase/firestore';
import { db } from './firebase';

export const updatePlayerDetails = async (uid, name, alias) => {
  const playerRef = doc(db, 'players', uid);
  const playersCollection = collection(db, 'players');

  const nameQuery = query(playersCollection, where('name', '==', name));
  const nameQuerySnapshot = await getDocs(nameQuery);

  if (!nameQuerySnapshot.empty) {
    const existingPlayer = nameQuerySnapshot.docs[0];
    if (existingPlayer.id !== uid) {
      throw new Error('A player with this name already exists');
    }
  }

  try {
    await updateDoc(playerRef, { name, alias });
  } catch (err) {
    throw new Error(err);
  }
};

export default {};
