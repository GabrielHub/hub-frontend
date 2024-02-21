import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

export const updatePlayerDetails = async ({ playerID, ftPerc, alias, aliasesToAdd }) => {
  const response = {};
  const body = {
    playerID,
    ftPerc,
    alias,
    aliasesToAdd
  };

  await axios
    .post(`${FIREBASE_BASE_URL}/updatePlayerDetails`, body)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
