import axios from 'axios';

const baseURL = 'https://startplaying.games/api';

/**
 * @description fetch an array of spells
 * @param {number} page pagination number
 * @returns An array of spells, with images, name, school and level
 */
export const fetchSpells = async (page) => {
  return axios
    .get(`${baseURL}/detect-magic/spells?page=${page}`)
    .then((res) => {
      return { data: res.data };
    })
    .catch((error) => {
      return { error };
    });
};

export default {};
