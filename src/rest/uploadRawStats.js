import axios from 'axios';
import { sanitizeArrayData, sanitizeObjectData } from 'utils';
import { FIREBASE_BASE_URL } from 'constants';
import { auth } from 'firebase';

/**
 * @description uploads raw data. Rest endpoint will calculate stats and upload game data
 * @param {*} rawPlayerData array of raw player data
 * @param {*} rawTeamData object with keys 1 and 2 corresponding to team data
 * @param {*} uploadKey an attempt at security :) I should never have used github pages :(
 * @returns Uploaded player data and the team data used to calculate stats
 */
export const uploadRawStats = async (rawPlayerData, rawTeamData) => {
  const token = await auth.currentUser.getIdToken();
  const response = {};
  const body = {
    rawPlayerData: sanitizeArrayData(rawPlayerData),
    rawTeamData: sanitizeObjectData(rawTeamData)
  };

  await axios
    .post(`${FIREBASE_BASE_URL}/upload`, body, {
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
