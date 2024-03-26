import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';
import { auth } from '../../fb';

export const updatePlayerDetails = async ({ playerID, ftPerc, alias, aliasesToAdd }) => {
  const token = await auth.currentUser.getIdToken();
  const response = {};
  const body = {
    playerID,
    ftPerc,
    alias,
    aliasesToAdd
  };

  await axios
    .post(`${FIREBASE_BASE_URL}/updatePlayerDetails`, body, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
