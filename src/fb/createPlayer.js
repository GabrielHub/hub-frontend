import { collection, addDoc, Timestamp, query, where, getDocs } from 'firebase/firestore';
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

  const nameQuery = query(playersCollection, where('name', '==', formattedName));
  const nameQuerySnapshot = await getDocs(nameQuery);

  if (!nameQuerySnapshot.empty) {
    throw new Error('A player with this name already exists');
  }

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
