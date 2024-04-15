import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

export const fetchArchive = async (year) => {
  const response = {};

  await axios
    .get(`${FIREBASE_BASE_URL}/fetchArchive?year=${year}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
