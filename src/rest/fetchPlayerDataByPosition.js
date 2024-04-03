import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

export const fetchPlayerDataByPosition = async (playerID, position) => {
  const response = {};

  await axios
    .get(
      `${FIREBASE_BASE_URL}/fetchPlayerDataByPosition?playerID=${playerID}${
        position && position !== '0' ? `&position=${position}` : ''
      }`
    )
    .then((res) => {
      response.data = res.data;
    })
    .catch((error) => {
      response.error = error;
    });

  return response;
};

export default {};
