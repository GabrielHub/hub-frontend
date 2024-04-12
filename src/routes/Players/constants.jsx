import { POSITION_READABLE } from 'constants';

export const AverageStatsColumns = [
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
    field: 'pf',
    headerName: 'FOUL'
  },
  {
    field: 'tov',
    headerName: 'TO'
  },
  {
    field: 'plusMinus',
    headerName: '+/-'
  }
];

export const EfficiencyStatsColumns = [
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
  },
  {
    field: 'fgPerc',
    headerName: 'FG%'
  },
  {
    field: 'threePerc',
    headerName: '3P%'
  },
  {
    field: 'efgPerc',
    headerName: 'eFG%'
  },
  {
    field: 'tsPerc',
    headerName: 'TS%'
  }
];

export const AdvancedStatsColumns = [
  {
    field: 'pace',
    headerName: 'PACE'
  },
  {
    field: 'usageRate',
    headerName: 'USG%'
  },
  {
    field: 'threepAR',
    headerName: '3PA%'
  },
  {
    field: 'astPerc',
    headerName: 'AST%'
  },
  {
    field: 'tovPerc',
    headerName: 'TO%'
  },
  {
    field: 'astToRatio',
    headerName: 'AST/TO'
  },
  {
    field: 'gameScore',
    headerName: 'GmScr'
  },
  {
    field: 'dd',
    headerName: 'DD'
  },
  {
    field: 'td',
    headerName: 'TD'
  }
];

export const DefensiveEfficiencyStatsColumns = [
  {
    field: 'oFGM',
    headerName: 'oFGM'
  },
  {
    field: 'oFGA',
    headerName: 'oFGA'
  },
  {
    field: 'o3PM',
    headerName: 'o3PM'
  },
  {
    field: 'o3PA',
    headerName: 'o3PA'
  },
  {
    field: 'oFGPerc',
    headerName: 'oFG%'
  },
  {
    field: 'o3PPerc',
    headerName: 'o3P%'
  },
  {
    field: 'oEFGPerc',
    headerName: 'oEFG%'
  }
];

export const BREADStatsColumns = [
  {
    field: 'bpm',
    headerName: 'BPM'
  },
  {
    field: 'estPointsPer100',
    headerName: 'BREAD Offensive'
  },
  {
    field: 'stopsPer100',
    headerName: 'BREAD Defensive'
  },
  {
    field: 'pProd',
    headerName: 'PProd'
  }
];

export const RECENT_GAMES_COLUMNS = [
  {
    field: '_createdAt',
    headerName: 'Date',
    valueGetter: (params) => {
      // eslint-disable-next-line no-underscore-dangle
      return new Date(params.value._seconds * 1000).toLocaleDateString('en-US');
    },
    flex: 1,
    sortable: false
  },
  {
    field: 'isAI',
    headerName: 'AI',
    valueGetter: (params) => {
      return params.value ? 'AI' : 'User';
    },
    flex: 1,
    sortable: false
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    sortable: false
  },
  {
    field: 'pos',
    headerName: 'POS',
    valueGetter: (params) => {
      return POSITION_READABLE[params.value];
    },
    flex: 1,
    sortable: false
  },
  {
    field: 'PER',
    headerName: 'PER',
    description:
      'This PER value is not what goes into your average. It is the PER that would be calculated based on when this game was uploaded',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'pts',
    headerName: 'PTS',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'treb',
    headerName: 'REB',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'ast',
    headerName: 'AST',
    type: 'number',
    flex: 1,
    sortable: false
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
    field: 'pf',
    headerName: 'FOUL',
    type: 'number',
    flex: 1
  },
  {
    field: 'tov',
    headerName: 'TO',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'usageRate',
    headerName: 'USG%',
    type: 'number',
    description:
      'Usage percentage is an estimate of the percentage of team plays used by a player while they were on the floor',
    flex: 1,
    sortable: false
  },
  {
    field: 'ortg',
    headerName: 'ORtg',
    type: 'number',
    description:
      'Offensive Rating is the points produced per 100 possessions or how many points is a player likely to generate when they try',
    flex: 1,
    sortable: false
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
    field: 'fgm',
    headerName: 'FGM',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'fga',
    headerName: 'FGA',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'threepm',
    headerName: '3PM',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'threepa',
    headerName: '3PA',
    type: 'number',
    flex: 1,
    sortable: false
  },
  {
    field: 'gameScore',
    headerName: 'GmScr',
    type: 'number',
    description:
      'Game Score is a rough measure of a player`s productivity for a single game, per game',
    flex: 1,
    sortable: false
  }
];

export default {};
