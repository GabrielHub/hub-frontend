import { RATING_CONFIG } from 'constants';

const mapRating = (value) => {
  const rating = Object.keys(RATING_CONFIG)
    .sort((a, b) => RATING_CONFIG[a] - RATING_CONFIG[b])
    .find((key) => value <= RATING_CONFIG[key]);

  return rating || 'MVP';
};

export const getRatingStringFromPER = (per) => {
  let rating = 10;
  if (per <= 0) {
    rating = 0;
  }
  if (per <= 15) {
    rating = (per / 15) * 5;
  }
  if (per <= 35) {
    rating = ((per - 15) / 20) * 5 + 5;
  }

  return mapRating(rating);
};

export default {};
