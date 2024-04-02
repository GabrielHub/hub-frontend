import { POSITION_READABLE } from 'constants';

export const getReadablePositions = (positions, limit = 0) => {
  return Object.entries(positions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit === 0 ? positions.length : limit)
    .map((posValue) => POSITION_READABLE[posValue[0]])
    .join('/');
};

export default {};
