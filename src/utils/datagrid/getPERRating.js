export const RATING_CONFIG = {
  GLeague: 3,
  Bench: 4.3,
  Rotation: 5,
  Starter: 5.4,
  SecondOption: 6.5,
  AllStar: 7.5,
  /** Highest value is 10 */
  Superstar: 10
};

const mapRating = (value) => {
  const rating = Object.keys(RATING_CONFIG)
    .sort((a, b) => RATING_CONFIG[a] - RATING_CONFIG[b])
    .find((key) => value <= RATING_CONFIG[key]);

  return rating || 'MVP';
};

// A function that takes a PER from 0 to 35+, and returns a scaled number from 0 to 10, relative to the PER
// A PER of 15 should always be a 5
export const getPERRating = (params) => {
  const per = params.value;
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

  return `${rating.toFixed(2)} (${mapRating(rating)})`;
};

export default {};
