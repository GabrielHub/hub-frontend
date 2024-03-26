import { collection, getDoc, getDocs, query, where, doc } from 'firebase/firestore';
import { db } from './firebase';

export const fetchPlayerAndGames = async (uid) => {
  const playerRef = doc(db, 'players', uid);
  const playerDoc = await getDoc(playerRef);
  const player = playerDoc.data();

  const gamesRef = query(collection(db, 'games'), where('name', 'in', player.alias));
  const gamesSnapshot = await getDocs(gamesRef);
  const games = gamesSnapshot.docs.map((document) => document.data());

  return { player, games };
};

export default {};
