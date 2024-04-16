import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

export const fetchBoxScore = async (uploadId) => {
  const response = {};

  await axios
    .get(`${FIREBASE_BASE_URL}/fetchRelatedGames?uploadId=${uploadId}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
