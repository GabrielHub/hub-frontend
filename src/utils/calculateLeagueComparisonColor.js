import { green, red, blueGrey } from '@mui/material/colors';
import { adjustStatByFilter } from './adjustPlayerDataByFilter';
import { STAT_PER_TYPES } from '../constants';

const ALPHA = 85;

// * These stats should flip the color. Less is green, and more is red
const STATS_TO_REVERSE = ['tov', 'pf', 'tovPerc', 'drtg'];

// * These stats are labeled differently in leagueData
export const INCORRECT_STAT_MAPPING = {
  threePerc: 'threepPerc'
};

export const calculateLeagueComparisonColor = (
  statName,
  playerStat,
  leagueStat,
  perGameFilter = STAT_PER_TYPES.DEFAULT,
  disablePlayerAdjust = false
) => {
  if (playerStat === undefined || playerStat === null) return `${blueGrey[200]}${ALPHA}`;

  if (leagueStat === undefined || leagueStat === null) return `${blueGrey[200]}${ALPHA}`;

  const adjustedLeagueStat = adjustStatByFilter(leagueStat, perGameFilter);
  const adjustedPlayerStat = disablePlayerAdjust
    ? playerStat
    : adjustStatByFilter(playerStat, perGameFilter);

  const smallDifference = 1;
  const largeDifference = 20;

  const difference = adjustedPlayerStat - adjustedLeagueStat;
  const scaledDifference = Math.max(
    Math.min((Math.abs(difference) - smallDifference) / (largeDifference - smallDifference), 1),
    0
  );
  // clamp colorIndex value between 100 and 900
  const colorIndex = Math.min(Math.max(Math.round(scaledDifference * 8) * 100, 100), 900);
  const greenColor = `${green[colorIndex]}${ALPHA}`;
  const redColor = `${red[colorIndex]}${ALPHA}`;

  if (difference > 0.9) {
    return STATS_TO_REVERSE.includes(statName) ? redColor : greenColor;
  }
  if (difference < -0.9) {
    return STATS_TO_REVERSE.includes(statName) ? greenColor : redColor;
  }
  return null;
};

export default {};
