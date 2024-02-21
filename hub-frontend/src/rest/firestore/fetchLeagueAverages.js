import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

export const fetchLeagueAverages = async () => {
  const response = {};

  await axios
    .get(`${FIREBASE_BASE_URL}/league`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
