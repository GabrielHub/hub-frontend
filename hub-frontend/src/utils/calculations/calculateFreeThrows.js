/**
 *
 * @param {*} points
 * @param {*} twoPM
 * @param {*} threePM
 * @returns
 */
export const calculateFreeThrowsMade = (points, twoPM, threePM) => {
  const ftm = points - (twoPM * 2 + threePM * 3);
  return ftm;
};

export default {};
