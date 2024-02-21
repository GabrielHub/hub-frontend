export const calculateDoubles = (points, rebounds, assists, steals, blocks) => {
  const stats = [points, rebounds, assists, steals, blocks];
  let count = 0;

  stats.forEach((stat) => {
    if (stat >= 10) {
      // eslint-disable-next-line no-plusplus
      count++;
    }
  });

  return {
    dd: count === 2 ? 1 : 0,
    tp: count === 3 ? 1 : 0,
    qd: count === 4 ? 1 : 0
  };
};

export default {};
