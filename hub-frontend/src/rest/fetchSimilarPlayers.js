import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

/**
 * @description return 3 most similar NBA players adjusted for min played
 * @param {string} playerID Player ID string
 * @returns {*} Array of NBA Players by similarity
 */
export const fetchSimilarPlayers = async (playerID) => {
  const response = {};

  await axios
    .get(`${FIREBASE_BASE_URL}/similarity?playerID=${playerID}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
