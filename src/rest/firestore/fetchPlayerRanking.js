import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

// TODO Remove this on the backend
/**
 * @deprecated This function is no longer used in the project.
 * @param {*} playerID
 * @returns
 */
export const fetchPlayerRanking = async (playerID) => {
  const response = {};

  await axios
    .get(`${FIREBASE_BASE_URL}/ranking?playerID=${playerID}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
