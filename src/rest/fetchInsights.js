import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

export const fetchInsights = async (playerID) => {
  const response = {};

  await axios
    .get(`${FIREBASE_BASE_URL}/fetchInsightForPlayer?playerId=${playerID}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
