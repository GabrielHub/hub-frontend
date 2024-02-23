export const FIREBASE_BASE_URL = process.env.REACT_APP_FIREBASE_BASE_URL;
export const ALGOLIA_KEY = process.env.REACT_APP_ALGOLIA_SEARCH_KEY;
export const ALGOLIA_PROJECT_ID = process.env.REACT_APP_ALGOLIA_PROJECT_ID;
export const NANONET_KEY = process.env.REACT_APP_NANONET;
export const NANONET_MODEL_ID = process.env.REACT_APP_MODEL_ID;

// TODO Currently broken so unused
export const MIN_GAMES = 3;

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

export default {};
