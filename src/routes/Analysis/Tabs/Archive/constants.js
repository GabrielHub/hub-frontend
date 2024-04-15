export const COLUMNS = [
  {
    field: 'name',
    headerName: 'Name',
    width: 150
  },
  {
    field: 'gp',
    headerName: 'GP',
    type: 'number',
    flex: 1
  },
  {
    field: 'ortg',
    headerName: 'ORtg',
    type: 'number',
    description:
      'Offensive Rating is the points produced per 100 possessions or how many points is a player likely to generate when they try',
    flex: 1
  },
  {
    field: 'drtg',
    headerName: 'DRtg',
    type: 'number',
    description:
      'Defensive Rating is how many points a player allows on average over the course of 100 team possessions',
    flex: 1
  },
  {
    field: 'pts',
    headerName: 'PTS',
    type: 'number',
    flex: 1
  },
  {
    field: 'treb',
    headerName: 'REB',
    type: 'number',
    flex: 1
  },
  {
    field: 'ast',
    headerName: 'AST',
    type: 'number',
    flex: 1
  },
  {
    field: 'stl',
    headerName: 'STL',
    type: 'number',
    flex: 1
  },
  {
    field: 'blk',
    headerName: 'BLK',
    type: 'number',
    flex: 1
  },
  {
    field: 'tov',
    headerName: 'TO',
    type: 'number',
    flex: 1
  },
  {
    field: 'pf',
    headerName: 'FOUL',
    type: 'number',
    flex: 1
  },
  {
    field: 'fgm',
    headerName: 'FGM',
    type: 'number',
    flex: 1
  },
  {
    field: 'fga',
    headerName: 'FGA',
    type: 'number',
    flex: 1
  },
  {
    field: 'threepm',
    headerName: '3PM',
    type: 'number',
    flex: 1
  },
  {
    field: 'threepa',
    headerName: '3PA',
    type: 'number',
    flex: 1
  },
  {
    field: 'ftm',
    headerName: 'FTM',
    type: 'number',
    flex: 1
  },
  {
    field: 'fta',
    headerName: 'FTA',
    type: 'number',
    flex: 1
  },
  {
    field: 'tovPerc',
    headerName: 'TOV%',
    type: 'number',
    description: 'Turnover percentage is an estimate of turnovers per 100 plays',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'astPerc',
    headerName: 'AST%',
    type: 'number',
    description:
      'Assist percentage is an estimate of the percentage of teammate field goals a player assisted while he was on the floor',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'astToRatio',
    headerName: 'AST/TO',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'fgPerc',
    headerName: 'FG%',
    type: 'number',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'threePerc',
    headerName: '3PT%',
    type: 'number',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'efgPerc',
    headerName: 'EFG%',
    description: 'FG% adjusted for 3 Pointers',
    type: 'number',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'tsPerc',
    headerName: 'TS%',
    type: 'number',
    description:
      'A measure of shooting efficiency that takes into account field goals, 3-point field goals, and free throws',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'threepAR',
    headerName: '3PaR',
    type: 'number',
    description: 'Percentage of shots taken from 3',
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'oFGA',
    headerName: 'oFGA',
    type: 'number',
    flex: 1
  },
  {
    field: 'oFGPerc',
    headerName: 'oFG%',
    description: `Opponent's FG%`,
    valueFormatter: ({ value }) => `${value}%`,
    type: 'number',
    flex: 1
  },
  {
    field: 'o3PPerc',
    headerName: 'o3P%',
    type: 'number',
    description: `Opponent's 3P%`,
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'oEFGPerc',
    headerName: 'oEFG%',
    type: 'number',
    description: `Opponent's FG% adjusted for 3 Pointers`,
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  },
  {
    field: 'drebPerc',
    headerName: 'REB%',
    type: 'number',
    description: `The percentage of available rebounds a player obtains while on the floor`,
    valueFormatter: ({ value }) => `${value}%`,
    flex: 1
  }
];

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
  field: 'ortg',
  type: 'desc'
};

export const VISIBILITY_MODEL = {
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

export const YEAR_OPTIONS = [{ value: 2023, label: '2023' }];

export default {};
