/**
 * @description Calculate 2pa/2pm based on existing stats
 * @param {*} fga
 * @param {*} fgm
 * @param {*} threePA
 * @param {*} threePM
 * @returns Object { twopa, twopm }
 */
export const calculateTwoPointers = (fga, fgm, threePA, threePM) => {
  // * Calculate the number of 2-pointers attempted by subtracting the 3-pointers attempted from the total field goals attempted
  const twoPA = fga - threePA;
  // * Calculate the number of 2-pointers made by subtracting the 3-pointers made from the total field goals made
  const twoPM = fgm - threePM;
  // * Return an object with the 2-pointers attempted and 2-pointers made
  return {
    twopa: twoPA,
    twopm: twoPM
  };
};

export default {};
