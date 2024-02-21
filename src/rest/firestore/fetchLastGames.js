import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

export const fetchLastGames = async ({ playerID, numOfGames }) => {
  const response = {};

  await axios
    .get(`${FIREBASE_BASE_URL}/fetchLastGames?playerID=${playerID}&numOfGames=${numOfGames}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
