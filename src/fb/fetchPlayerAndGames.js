import { collection, getDoc, getDocs, query, where, doc, orderBy } from 'firebase/firestore';
import { db } from './firebase';

export const fetchPlayerAndGames = async (uid) => {
  const playerRef = doc(db, 'players', uid);
  const playerDoc = await getDoc(playerRef);
  const player = playerDoc.data();

  const gamesRef = query(
    collection(db, 'games'),
    where('name', 'in', player.alias),
    orderBy('_createdAt', 'desc')
  );
  const gamesSnapshot = await getDocs(gamesRef);
  const games = gamesSnapshot.docs.map((document) => ({
    ...document.data(),
    id: document.id
  }));

  return { player, games };
};

export default {};
