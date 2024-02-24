import axios from 'axios';
import { FIREBASE_BASE_URL } from 'constants';

export const fetchSimilarPlayers = async (playerID, perGame, season, paceAdjust, limit) => {
  const response = {};

  await axios
    .get(
      `${FIREBASE_BASE_URL}/similarity?playerID=${playerID}&perGame=${perGame}&season=${season}&paceAdjust=${paceAdjust}&limit=${limit}`
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
