import { STAT_PER_TYPES } from '../constants';

const statsToAdjust = [
  'pts',
  'treb',
  'ast',
  'stl',
  'blk',
  'tov',
  'pf',
  'fga',
  'fgm',
  'threepa',
  'threepm',
  'fta',
  'ftm',
  'dreb',
  'oreb',
  // * Advanced stats
  'pace',
  'gameScore',
  'oFGA',
  'oFGM',
  'o3PA',
  'o3PM',
  'estPoss'
];
const playerMinutes = 20;

export const adjustDataByFilter = (data, filter) => {
  if (filter === STAT_PER_TYPES.PER_36) {
    return data.map((player) => {
      const adjustedPlayer = { ...player };
      statsToAdjust.forEach((stat) => {
        if (adjustedPlayer[stat])
          adjustedPlayer[stat] = Math.round((player[stat] / playerMinutes) * 36 * 10) / 10;
      });
      return adjustedPlayer;
    });
  }
  if (filter === STAT_PER_TYPES.PER_100) {
    return data.map((player) => {
      const adjustedPlayer = { ...player };
      statsToAdjust.forEach((stat) => {
        if (adjustedPlayer[stat]) {
          adjustedPlayer[stat] = Math.round((player[stat] / player.pace) * 100 * 10) / 10;
        }
      });
      return adjustedPlayer;
    });
  }
  return data;
};

export const adjustStatByFilter = (stat, pace, value, filter) => {
  if (!statsToAdjust.includes(stat)) return value;
  if (filter === STAT_PER_TYPES.PER_36) {
    return Math.round((value / playerMinutes) * 36 * 10) / 10;
  }
  if (filter === STAT_PER_TYPES.PER_100) {
    return Math.round((value / pace) * 100 * 10) / 10;
  }
  return value;
};

export default {};
