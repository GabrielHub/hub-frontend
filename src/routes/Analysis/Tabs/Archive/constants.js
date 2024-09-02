export const BASIC_LEAGUE_STATS = [
  {
    field: 'pts',
    headerName: 'PTS'
  },
  {
    field: 'treb',
    headerName: 'REB'
  },
  {
    field: 'ast',
    headerName: 'AST'
  },
  {
    field: 'stl',
    headerName: 'STL'
  },
  {
    field: 'blk',
    headerName: 'BLK'
  },
  {
    field: 'tov',
    headerName: 'TO'
  },
  {
    field: 'pf',
    headerName: 'FOUL'
  },
  {
    field: 'fgm',
    headerName: 'FGM'
  },
  {
    field: 'fga',
    headerName: 'FGA'
  },
  {
    field: 'threepm',
    headerName: '3PM'
  },
  {
    field: 'threepa',
    headerName: '3PA'
  },
  {
    field: 'ftm',
    headerName: 'FTM'
  },
  {
    field: 'fta',
    headerName: 'FTA'
  }
];

export const EFFICIENCY_LEAGUE_STATS = [
  {
    field: 'fgPerc',
    headerName: 'FG%'
  },
  {
    field: 'threePerc',
    headerName: '3PT%'
  },
  {
    field: 'efgPerc',
    headerName: 'EFG%'
  },
  {
    field: 'tsPerc',
    headerName: 'TS%'
  }
];

export const DEFAULT_SORTS = {
  field: 'PER',
  type: 'desc'
};

export const VISIBILITY_MODEL = {
  usageRate: false,
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
  grd: false
};

export const YEAR_OPTIONS = [
  { value: 2024, label: '2024' },
  { value: 2023, label: '2023' }
];

export default {};
