import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

export const fetchPlayerData = async (playerID) => {
  const response = {};

  await axios
    .get(`${FIREBASE_BASE_URL}/lookupPlayer?playerID=${playerID}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
