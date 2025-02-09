import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

export const fetchTableDataByPosition = async (position) => {
  const response = {};
  const positionNum = parseInt(position, 10);

  if (Number.isNaN(positionNum) || positionNum < 1 || positionNum > 5) {
    response.error = new Error('Invalid position: must be a number between 1 and 5');
    return response;
  }

  await axios
    .get(`${FIREBASE_BASE_URL}/fetchForTableByPosition?position=${positionNum}`)
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
