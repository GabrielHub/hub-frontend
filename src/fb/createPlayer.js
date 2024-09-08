import { doc, setDoc, Timestamp } from 'firebase/firestore';
import { INITIAL_ELO } from '../constants';
import { db } from './firebase';

export const createPlayer = async (name, aliases) => {
  const formattedName = name.trim();
  const uniqueAliases = [
    ...new Set([
      ...aliases.split(',').map((alias) => alias.toLowerCase().trim()),
      formattedName.toLowerCase()
    ])
  ];

  const playerRef = doc(db, 'players', formattedName);
  try {
    await setDoc(playerRef, {
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
  } catch (err) {
    throw new Error(err);
  }
};

export default {};
