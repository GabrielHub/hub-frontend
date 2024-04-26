import { STAT_PER_TYPES } from 'constants';

const RANKING_VISIBILITY_MODEL = {
  usageRate: false,
  PER: false,
  gameScore: false,
  ortg: false,
  drtg: false,
  tovPerc: false,
  astPerc: false,
  fgPerc: false,
  threePerc: false,
  tsPerc: false,
  threepAR: false,
  oFGA: false,
  oFGM: false,
  oFGPerc: false,
  o3PPerc: false,
  oEFGPerc: false,
  drebPerc: false,
  pace: false,
  fgm: false,
  fga: false,
  threepm: false,
  threepa: false,
  ftm: false,
  fta: false,
  astToRatio: false,
  plusMinus: false,
  estPointsPer100: false,
  stopsPer100: false,
  pProd: false,
  grd: false,
  win: false,
  loss: false
};

const CONFIG = {
  rankingTableVisibilityModel: {
    initialState: RANKING_VISIBILITY_MODEL,
    setAction: 'SET_RANKING_VISIBILITY_MODEL',
    setFunction: 'setRankingTableVisibilityModel',
    getFunction: 'getRankingTableVisibilityModel'
  },
  perGameFilter: {
    initialState: STAT_PER_TYPES.DEFAULT,
    setAction: 'SET_PER_GAME_FILTER',
    setFunction: 'setPerGameFilter',
    getFunction: 'getPerGameFilter'
  },
  leagueComparisonToggle: {
    initialState: false,
    setAction: 'SET_LEAGUE_COMPARISON_TOGGLE',
    setFunction: 'setLeagueComparisonToggle',
    getFunction: 'getLeagueComparisonToggle'
  }
};

export default CONFIG;
