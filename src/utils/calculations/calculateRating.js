export const calculateRating = (PER) => {
  // Take a PER from 0 to 35+ and convert it to a 0-10 scale. a PER of 15 is always 5
  let rating = 10;
  if (PER <= 0) {
    rating = 0;
  }
  if (PER <= 15) {
    rating = (PER / 15) * 5;
  }
  if (PER <= 35) {
    rating = ((PER - 15) / 20) * 5 + 5;
  }

  return rating;
};

export const calculatePER = (rating) => {
  let PER = 0;
  if (rating <= 0) {
    PER = 0;
  }
  if (rating <= 5) {
    PER = (rating / 5) * 15;
  }
  if (rating <= 10) {
    PER = ((rating - 5) / 5) * 20 + 15;
  }

  return PER;
};

export default {};
