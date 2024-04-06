import { green, red, blueGrey } from '@mui/material/colors';
import { adjustStatByFilter } from './adjustPlayerDataByFilter';
import { STAT_PER_TYPES } from '../constants';

const ALPHA = 65;

// * These stats should flip the color. Less is green, and more is red
const STATS_TO_REVERSE = ['tov', 'pf', 'tovPerc', 'drtg'];
// * Unique weights for stats that don't follow the normal pattern
const STAT_WEIGHTS = {
  pace: {
    smallDifference: 0.5,
    largeDifference: 8,
    threshold: 0.8
  },
  ortg: {
    smallDifference: 5,
    largeDifference: 25,
    threshold: 5
  },
  treb: {
    smallDifference: 0.5,
    largeDifference: 3,
    threshold: 0.5
  },
  ast: {
    smallDifference: 0.2,
    largeDifference: 4,
    threshold: 0.5
  },
  tov: {
    smallDifference: 0.1,
    largeDifference: 4,
    threshold: 0.2
  },
  pf: {
    smallDifference: 0.1,
    largeDifference: 4,
    threshold: 0.2
  },
  fgm: {
    smallDifference: 0.5,
    largeDifference: 5,
    threshold: 1
  },
  fga: {
    smallDifference: 0.5,
    largeDifference: 5,
    threshold: 1
  },
  threepm: {
    smallDifference: 0.1,
    largeDifference: 5,
    threshold: 0.3
  },
  threepa: {
    smallDifference: 0.1,
    largeDifference: 5,
    threshold: 0.3
  },
  fta: {
    smallDifference: 0.1,
    largeDifference: 1,
    threshold: 0.1
  },
  ftm: {
    smallDifference: 0.1,
    largeDifference: 1,
    threshold: 0.1
  },
  astToRatio: {
    smallDifference: 0.3,
    largeDifference: 2,
    threshold: 0.2
  },
  drtg: {
    smallDifference: 5,
    largeDifference: 25,
    threshold: 5
  },
  stl: {
    smallDifference: 0.2,
    largeDifference: 2,
    threshold: 0.4
  },
  blk: {
    smallDifference: 0.1,
    largeDifference: 1.3,
    threshold: 0.2
  }
};

// * These stats are labeled differently in leagueData
export const INCORRECT_STAT_MAPPING = {
  threePerc: 'threepPerc'
};

export const calculateLeagueComparisonColor = (
  statName,
  playerStat,
  leagueStat,
  // * If the rest of these aren't passed in, pace doesn't matter since it will never be used
  pace = 50,
  perGameFilter = STAT_PER_TYPES.DEFAULT,
  disablePlayerAdjust = false
) => {
  if (playerStat === undefined || playerStat === null) return `${blueGrey[200]}${ALPHA}`;
  if (leagueStat === undefined || leagueStat === null) return `${blueGrey[200]}${ALPHA}`;

  const adjustedLeagueStat =
    perGameFilter !== STAT_PER_TYPES.DEFAULT
      ? adjustStatByFilter(statName, pace, leagueStat, perGameFilter)
      : leagueStat;
  const adjustedPlayerStat = disablePlayerAdjust
    ? playerStat
    : adjustStatByFilter(statName, pace, playerStat, perGameFilter);

  const smallDifference = STAT_WEIGHTS?.[statName]?.smallDifference ?? 1;
  const largeDifference = STAT_WEIGHTS?.[statName]?.largeDifference ?? 10;
  const threshold = STAT_WEIGHTS?.[statName]?.threshold ?? 1;

  const difference = adjustedPlayerStat - adjustedLeagueStat;
  const scaledDifference = Math.max(
    Math.min((Math.abs(difference) - smallDifference) / (largeDifference - smallDifference), 1),
    0
  );

  const colorIndex = Math.min(Math.max(Math.round(scaledDifference * 8) * 100, 100), 900);
  const greenColor = `${green[colorIndex]}${ALPHA}`;
  const redColor = `${red[colorIndex]}${ALPHA}`;

  if (difference > threshold) {
    return STATS_TO_REVERSE.includes(statName) ? redColor : greenColor;
  }
  if (difference < -threshold) {
    return STATS_TO_REVERSE.includes(statName) ? greenColor : redColor;
  }
  return null;
};

export default {};
