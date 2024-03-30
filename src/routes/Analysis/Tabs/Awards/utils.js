import { POSITION_READABLE } from 'constants';

/** Helper function to format position to readable */
export const formatPosition = (position) => {
  if (position?.length) {
    return `(${POSITION_READABLE[parseInt(position[0], 10)]}/${
      POSITION_READABLE[parseInt(position[1], 10)]
    })`;
  }
  return '';
};

export default {};
