import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';
import { auth } from 'fb';

export const recalculateElo = async (reason) => {
  try {
    const token = await auth.currentUser.getIdToken();
    await axios.get(`${FIREBASE_BASE_URL}/generateElo?reason=${reason}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  } catch (err) {
    throw new Error(err);
  }
};

export default {};
