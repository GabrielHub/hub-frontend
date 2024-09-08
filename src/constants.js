export const FIREBASE_BASE_URL = process.env.REACT_APP_FIREBASE_BASE_URL;
export const ALGOLIA_KEY = process.env.REACT_APP_ALGOLIA_SEARCH_KEY;
export const ALGOLIA_PROJECT_ID = process.env.REACT_APP_ALGOLIA_PROJECT_ID;
export const NANONET_KEY = process.env.REACT_APP_NANONET;
export const NANONET_MODEL_ID = process.env.REACT_APP_MODEL_ID;
export const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_API_KEY;

// TODO Currently broken so unused
export const MIN_GAMES = 3;

export const RATING_COLOR_MAP = {
  Rookie: '#f08787',
  Bench: '#f1b06e',
  Rotation: '#f0e17f',
  Starter: '#93fa7e',
  ThirdOption: `#00f5d4`,
  SecondOption: '#00bbf9',
  AllStar: '#9b5de5',
  Superstar: '#f15bb5'
};

export const ELO_CONFIG = {
  Bronze: 1099,
  Silver: 1299,
  Gold: 1499,
  Emerald: 1599,
  Sapphire: 1699,
  Ruby: 1799,
  Amethyst: 1899,
  Diamond: 1999,
  Opal: 2100,
  Invincible: 2200
};

export const RATING_CONFIG = {
  Rookie: 3,
  Bench: 4,
  Rotation: 5,
  Starter: 5.5,
  ThirdOption: 6,
  SecondOption: 6.5,
  AllStar: 8,
  /** Highest value is 10 */
  Superstar: 10
};

export const STAT_PER_TYPES = {
  DEFAULT: 'PerGame',
  PER_36: 'Per36',
  PER_100: 'Per100Possessions'
};

export const POSITION_READABLE = {
  1: 'PG',
  2: 'SG',
  3: 'SF',
  4: 'PF',
  5: 'C'
};

export const TEAM_STAT_READABLE = {
  team: 'TEAM',
  grd: 'GRADE',
  pts: 'PTS',
  reb: 'REB',
  ast: 'AST',
  stl: 'STL',
  blk: 'BLK',
  pf: 'FOULS',
  tov: 'TO',
  fgm: 'FGM',
  fga: 'FGA',
  threepa: '3PA',
  threepm: '3PM'
};

export const PLAYER_STAT_READABLE = {
  name: 'NAME',
  grd: 'GRADE',
  team: 'TEAM #',
  pos: 'POS',
  pts: 'PTS',
  treb: 'REB',
  ast: 'AST',
  stl: 'STL',
  blk: 'BLK',
  pf: 'FOULS',
  tov: 'TO',
  fgm: 'FGM',
  fga: 'FGA',
  threepm: '3PM',
  threepa: '3PA'
};

export const THEME_COLORS = {
  PRIMARY: '#004e9a',
  SECONDARY: '#ea4493',
  PRIMARY_LIGHT: '#418cd4',
  SECONDARY_LIGHT: '#ff9cdb',
  LIGHT: '#feffec',
  DARK: '#051b2c'
};

export const INITIAL_ELO = 1500;

export default {};
