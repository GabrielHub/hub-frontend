import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { INITIAL_ELO } from '../constants';
import { db } from './firebase';

export const createPlayer = async (name, aliases) => {
  const formattedName = name.trim();
  const uniqueAliases = [
    ...new Set([
      ...aliases
        .split(',')
        .map((alias) => alias.toLowerCase().trim())
        .filter((alias) => alias !== ''),
      formattedName.toLowerCase()
    ])
  ];

  const playersCollection = collection(db, 'players');
  try {
    const docRef = await addDoc(playersCollection, {
      name: formattedName,
      alias: uniqueAliases,
      elo: INITIAL_ELO,
      eBPM: 0,
      bpm: 0,
      gp: 0,
      gpSinceLastRating: 0,
      plusMinus: 0,
      _createdAt: Timestamp.now(),
      _updatedAt: Timestamp.now()
    });

    return docRef.id; // Return the auto-generated UID
  } catch (err) {
    throw new Error(err);
  }
};

export default {};
