import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

/**
 * @description Looks up a gm, and increases their popularity
 * @param {string} username username of GM to search
 * @returns {*} Object { username, name, image, requests, reviews }
 */
export const lookupGM = async (username) => {
  const response = {};
  const body = {
    username
  };

  await axios
    .post(`${FIREBASE_BASE_URL}/lookup`, body)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
